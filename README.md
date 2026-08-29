# create-express-ts-app

A professional CLI to scaffold production-ready Express + TypeScript APIs with zero configuration.

## Features

- **3 Template Variants**: Minimal, Standard, Advanced
- **Interactive Prompts**: Choose what you need
- **Built-in Tooling**: ESLint, Prettier, Husky, Vitest
- **Production Ready**: Docker, GitHub Actions, Swagger, Zod, Pino
- **Modern ESM**: Native ES modules with path aliases

## Usage

```bash
npx create-express-ts-app my-api
```

## Templates

| Template | Description |
|----------|-------------|
| `minimal` | Express + TypeScript only |
| `standard` | + ESLint, Prettier, Vitest, Husky |
| `advanced` | + Docker, Swagger, Zod, Pino, Security, CI/CD |

## Options

```bash
npx create-express-ts-app my-api --template advanced --docker
```

| Flag | Description |
|------|-------------|
| `-t, --template <type>` | Choose template (minimal/standard/advanced) |
| `--docker` | Include Docker setup |
| `--skip-git` | Skip Git initialization |
| `--skip-install` | Skip dependency installation |

## License

MIT
