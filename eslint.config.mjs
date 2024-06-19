// @ts-check
import { builtinModules } from 'node:module'
import eslint from '@eslint/js'
import pluginN from 'eslint-plugin-n'
import * as pluginI from 'eslint-plugin-i'
import pluginRegExp from 'eslint-plugin-regexp'
import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEslint from '@typescript-eslint/eslint-plugin'

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      '**/dist/**',
      '**/static/**',
      '**/.turbo/**',
      '**/temp/**',
      '**/.vitepress/cache/**',
      '**/*.snap',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  /** @type {any} */ (pluginRegExp.configs['flat/recommended']),
  {
    name: 'main/node',
    files: ['servers/cli/**/*.ts', 'servers/api/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      n: pluginN,
      i: pluginI,
    },
    rules: {
      'n/no-exports-assign': 'error',
      'n/no-unpublished-bin': 'error',
      'n/no-unsupported-features/es-builtins': 'error',
      'n/process-exit-as-throw': 'error',
      'n/hashbang': 'error',

      eqeqeq: ['warn', 'always', { null: 'never' }],
      'no-debugger': ['error'],
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'no-process-exit': 'off',
      'no-useless-escape': 'off',
      'prefer-const': [
        'warn',
        {
          destructuring: 'all',
        },
      ],

      'n/no-missing-require': [
        'error',
        {
          allowModules: ['pnpapi', 'vite'],
          tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts'],
        },
      ],
      'n/no-extraneous-import': [
        'error',
        {
          allowModules: ['vite', 'less', 'sass', 'vitest', 'unbuild'],
        },
      ],
      'n/no-extraneous-require': [
        'error',
        {
          allowModules: ['vite'],
        },
      ],

      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['arrowFunctions'] },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-extra-semi': 'off',
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': ['off'],
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/ban-tslint-comment': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/prefer-function-type': 'off',

      'i/no-nodejs-modules': [
        'error',
        { allow: builtinModules.map((mod) => `node:${mod}`) },
      ],
      'i/no-duplicates': 'error',
      'i/order': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],

      'regexp/no-contradiction-with-assertion': 'error',
      // in some cases using explicit letter-casing is more performant than the `i` flag
      'regexp/use-ignore-case': 'off',
    },
  },

  {
    name: 'main/client',
    files: [
      'servers/client/**/*.{ts,tsx,js,jsx}',
      'client/web-spa/**/*.{ts,tsx,js,jsx}',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
      },
      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
    },
    extends: [eslint.configs.recommended],
    plugins: {
      '@typescript-eslint': tsEslint,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    name: 'disables/js',
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    name: 'disables/dts',
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    name: 'disables/test',
    files: ['**/__tests__/**/*.?([cm])[jt]s?(x)'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
)
