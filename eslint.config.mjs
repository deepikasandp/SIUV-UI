// eslint.config.mjs

import { eslintPlugin as tsPlugin } from '@typescript-eslint/eslint-plugin';
import { parser as tsParser } from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Include TypeScript files
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        project: './tsconfig.json', // Path to your tsconfig.json file
        sourceType: 'module' // Enable ECMAScript modules
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin
    },
    rules: {
      // TypeScript recommended rules
      ...tsPlugin.configs.recommended.rules,
      // Prettier as an ESLint rule
      'prettier/prettier': 'error', // Show Prettier formatting issues as errors
      // Import rules
      'import/no-unresolved': 'error', // Ensure all imports can be resolved
      'import/order': [
        'warn',
        {
          // Enforce import order
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always'
        }
      ],
      'import/no-unused-modules': 'warn' // Warn about unused modules
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json' // Resolve TypeScript modules based on tsconfig
        }
      }
    },
    // Disable ESLint rules that conflict with Prettier
    ...prettierConfig
  }
];
