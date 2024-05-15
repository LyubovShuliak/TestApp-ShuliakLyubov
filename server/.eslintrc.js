module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'unused-imports',
    'simple-import-sort',
  ],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    'prettier/prettier': 'error',
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
  },
};
