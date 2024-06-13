module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'prettier',
    'unused-imports',
    'simple-import-sort',
    'react',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'parameter',
        format: ['camelCase'],
        trailingUnderscore: 'allowSingleOrDouble',
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'enumMember',
        format: ['PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
      },
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    'prettier/prettier': 'off',
    'no-empty': 'off',
    'no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^(@nestjs|[^@.]+)'],
          // Packages `react` related packages come first.
          // Internal packages.
          ['^(@server|@app([./]))(/.*|$)', '^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
        ],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
