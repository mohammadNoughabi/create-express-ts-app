#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  cpSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { execSync } from "node:child_process";

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";

const __dirname = dirname(fileURLToPath(import.meta.url));
const program = new Command();

program
  .name("create-exts-app")
  .description("Scaffold a production-ready Express + TypeScript API")
  .version("1.0.0")
  .argument("[project-name]", "Name of your project")
  .option("-t, --template <type>", "Template variant", "standard")
  .option("--skip-git", "Skip Git initialization")
  .option("--docker", "Include Docker setup")
  .action(async (projectName, options) => {
    // Interactive prompts if name not provided
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Project name:",
          validate: (input) => input.trim() !== "" || "Name is required",
        },
        {
          type: "list",
          name: "template",
          message: "Choose a template:",
          choices: [
            { name: "Minimal    (Express + TS only)", value: "minimal" },
            {
              name: "Standard   (+ ESLint, Prettier, Vitest, Husky)",
              value: "standard",
            },
            {
              name: "Advanced   (+ Docker, Swagger, Zod, Pino, CI/CD)",
              value: "advanced",
            },
          ],
          default: "standard",
        },
        {
          type: "confirm",
          name: "docker",
          message: "Include Docker setup?",
          default: false,
          when: (ans) => ans.template !== "minimal",
        },
      ]);
      projectName = answers.name;
      options.template = answers.template;
      if (answers.docker !== undefined) options.docker = answers.docker;
    }

    const targetDir = join(process.cwd(), projectName);

    if (existsSync(targetDir)) {
      console.error(
        chalk.red(`\n❌ Directory "${projectName}" already exists.\n`),
      );
      process.exit(1);
    }

    // Fancy header
    console.log(chalk.cyan(figlet.textSync("Express TS", { font: "Small" })));
    console.log(chalk.gray("Scaffolding your project...\n"));

    // Step 1: Copy template
    const spinner = ora("Copying template files...").start();
    const templateDir = join(__dirname, "..", "templates", options.template);

    if (!existsSync(templateDir)) {
      spinner.fail(chalk.red(`Template "${options.template}" not found.`));
      process.exit(1);
    }

    mkdirSync(targetDir, { recursive: true });
    cpSync(templateDir, targetDir, { recursive: true });
    spinner.succeed("Template files copied");

    // Step 2: Update package.json name
    const pkgPath = join(targetDir, "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    pkg.name = projectName;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

    // Step 3: Conditional Docker files
    if (!options.docker) {
      const dockerFiles = ["Dockerfile", "docker-compose.yml", ".dockerignore"];
      dockerFiles.forEach((f) => {
        const p = join(targetDir, f);
        if (existsSync(p)) rmSync(p);
      });
    }

    // Step 4: Git init
    if (!options.skipGit) {
      const gitSpinner = ora("Initializing Git repository...").start();
      try {
        execSync("git init", { cwd: targetDir, stdio: "ignore" });
        execSync("git checkout -b main", { cwd: targetDir, stdio: "ignore" });
        gitSpinner.succeed("Git repository initialized");
      } catch {
        gitSpinner.warn("Git initialization failed");
      }
    }

    // Step 5: Setup Husky (standard & advanced only)
    if (options.template !== "minimal") {
      const huskySpinner = ora("Setting up Git hooks...").start();
      try {
        execSync("npx husky init", { cwd: targetDir, stdio: "ignore" });
        const preCommit = join(targetDir, ".husky", "pre-commit");
        writeFileSync(preCommit, "npx lint-staged\n", { mode: 0o755 });

        // Pre-push for advanced
        if (options.template === "advanced") {
          const prePush = join(targetDir, ".husky", "pre-push");
          writeFileSync(prePush, "npm run test:run\n", { mode: 0o755 });
        }
        huskySpinner.succeed("Git hooks configured");
      } catch {
        huskySpinner.warn("Husky setup failed. Run `npx husky init` manually.");
      }
    }

    // Step 6: Generate README for advanced
    if (options.template === "advanced") {
      const readme = generateReadme(projectName, options);
      writeFileSync(join(targetDir, "README.md"), readme);
    }

    // Success message
    console.log(chalk.green.bold(`\n✅ Successfully created ${projectName}\n`));
    console.log(chalk.white("Get started:"));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan("  npm install"));
    console.log(chalk.cyan("  npm run dev"));
    console.log(chalk.gray("\n📖 Read the README.md for more commands.\n"));
  });

function generateReadme(name, opts) {
  return `# ${name}

A production-ready Express + TypeScript API.

## 🚀 Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📜 Scripts

| Command | Description |
|---------|-------------|
| \`npm run dev\` | Start development server with hot reload |
| \`npm run build\` | Compile TypeScript to \`dist/\` |
| \`npm run start\` | Run production build |
| \`npm test\` | Run tests in watch mode |
| \`npm run test:run\` | Run tests once |
| \`npm run test:coverage\` | Run tests with coverage report |
| \`npm run lint\` | Lint source files |
| \`npm run lint:fix\` | Fix linting issues |
| \`npm run format\` | Format code with Prettier |

${
  opts.docker
    ? `## 🐳 Docker

\`\`\`bash
docker-compose up --build
\`\`\`
`
    : ""
}
## 📁 Project Structure

\`\`\`
src/
├── config/        # Environment, logger, swagger
├── middleware/    # Security, error handling, validation
├── routes/        # API routes
└── index.ts       # Entry point
\`\`\`

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| \`NODE_ENV\` | Runtime environment | \`development\` |
| \`PORT\` | Server port | \`3000\` |
| \`LOG_LEVEL\` | Pino log level | \`info\` |

## License

MIT
`;
}

program.parse();
