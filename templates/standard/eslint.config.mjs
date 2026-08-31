import tseslint from 'typescript-eslint';
import globals from 'globals';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  // ====================
  // BASIC CONFIGURATION
  // ====================
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        // Optional but recommended in 2025+:
        project: true, // ← let it auto-discover tsconfig.json
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/build/**',
      '**/uploads/**',
    ],
  },
  // ====================
  // TYPE SAFETY RULES
  // ====================
  {
    rules: {
      // Prevents awaiting non-promise values
      '@typescript-eslint/await-thenable': 'error',

      // Prevents use of `any` type (configurable strictness)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Requires explicit return types on functions (disabled for flexibility)
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Ensures promises are handled properly
      '@typescript-eslint/no-floating-promises': 'error',

      // Prevents unnecessary conditionals on always-truthy values
      '@typescript-eslint/no-unnecessary-condition': 'warn',

      // Prevents unsafe any usage
      '@typescript-eslint/no-unsafe-argument': 'error',

      // Type consistency
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
    },
  },
  // ====================
  // CODE QUALITY RULES
  // ====================
  {
    rules: {
      // Prevents unused variables (allow variables starting with underscore)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Enforces strict equality (=== instead of ==)
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // Prevents empty functions (allow arrow functions)
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],

      // Prevents eval usage
      'no-eval': 'error',

      // Encourages const over let when possible
      'prefer-const': 'error',

      // Prevents var usage
      'no-var': 'error',

      // Enforces template literals over string concatenation
      'prefer-template': 'error',

      // Requires default parameters at the end
      'default-param-last': 'error',

      // Prevents unnecessary else blocks
      'no-else-return': 'warn',
    },
  },
  // ====================
  // ASYNC/AWAIT RULES
  // ====================
  {
    rules: {
      // Prevents returning await unnecessarily
      'no-return-await': 'error',

      // Warns on async functions without await
      'require-await': 'warn',

      // Prevents promise executor async functions without await
      'no-async-promise-executor': 'error',

      // Prevents await inside loops (can be optimized)
      'no-await-in-loop': 'warn',
    },
  },
  // ====================
  // MODULE RESOLUTION
  // ====================
  {
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'always',
          tsx: 'always',
          js: 'always',
          jsx: 'always',
        },
      ],
    },
  },
);