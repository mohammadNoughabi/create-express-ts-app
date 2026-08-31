# create-express-ts-app

A CLI to scaffold a production-ready **Express + TypeScript** API in seconds — no configuration required.

[![npm version](https://img.shields.io/npm/v/create-express-ts-app.svg)](https://www.npmjs.com/package/create-express-ts-app)
[![license](https://img.shields.io/npm/l/create-express-ts-app.svg)](./LICENSE)
[![node](https://img.shields.io/node/v/create-express-ts-app.svg)](https://nodejs.org)

## Quick Start

```bash
npx create-express-ts-app my-api
cd my-api
npm run dev
```

That's it — you have a running Express + TypeScript server with hot reload.

You can also run it without a project name to get interactive prompts:

```bash
npx create-express-ts-app
```

## Features

- ⚡ **Three template variants** — pick exactly the amount of tooling you need
- 🧭 **Interactive setup** — guided prompts when you don't pass flags
- 🧹 **Built-in tooling** — ESLint, Prettier, Husky, lint-staged, Vitest
- 🐳 **Optional Docker support** — Dockerfile + docker-compose on request
- 🔐 **Production-ready middleware** (advanced template) — Helmet, CORS, rate limiting, structured logging with Pino, Zod validation, Swagger docs
- 🔧 **CI/CD included** (advanced template) — GitHub Actions workflows for CI and release
- 📦 **Modern ESM** — native ES modules, `tsx` for dev, path aliases where applicable
- 🚀 **Zero config** — one command, working project

## Templates

| Template   | Includes |
|------------|----------|
| `minimal`  | Express + TypeScript only. Nothing else. |
| `standard` | + ESLint, Prettier, Husky, lint-staged, Vitest, Supertest |
| `advanced` | + Docker, Swagger (OpenAPI), Zod validation, Pino logging, Helmet, CORS, rate limiting, GitHub Actions CI/CD |

Choose one with `-t`/`--template`, or pick interactively if you omit it.

## Usage

```bash
npx create-express-ts-app <project-name> [options]
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --template <type>` | Template to use: `minimal`, `standard`, or `advanced` | `standard` |
| `--docker` | Include Docker setup (`standard`/`advanced` only) | `false` |
| `--skip-git` | Skip `git init` | `false` |
| `--skip-install` | Skip `npm install` after scaffolding | `false` |
| `-V, --version` | Print the CLI version | — |
| `-h, --help` | Show help | — |

### Examples

```bash
# Interactive mode — prompts for name, template, and Docker
npx create-express-ts-app

# Standard template (default), skip Docker prompt entirely
npx create-express-ts-app my-api

# Advanced template with Docker included
npx create-express-ts-app my-api --template advanced --docker

# Minimal template, no git repo, no auto-install
npx create-express-ts-app my-api --template minimal --skip-git --skip-install
```

## What You Get

```
my-api/
├── src/
│   ├── index.ts          # Entry point
│   ├── app.ts            # Express app setup
│   ├── config/           # Env, logger, Swagger (standard/advanced)
│   ├── middleware/        # Security, error handling, validation (advanced)
│   └── routes/            # API routes (advanced)
├── tests/                 # Vitest + Supertest (standard/advanced)
├── package.json
├── tsconfig.json
└── ...tooling configs (ESLint, Prettier, Husky, Docker, CI)
```

Once inside your generated project, the standard commands are available:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled production build |
| `npm test` | Run tests (standard/advanced) |
| `npm run lint` | Lint the source (standard/advanced) |
| `npm run format` | Format with Prettier (standard/advanced) |

## Requirements

- Node.js `>= 20.0.0`
- npm (or your package manager of choice, after scaffolding)

## Contributing

Issues and pull requests are welcome. If you're proposing a larger change (a new template, a new flag), open an issue first to discuss it.

## License

MIT © [Mohammad Hossein Noughabi](https://www.npmjs.com/mohammadnoughabi)