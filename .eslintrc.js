module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended'
  ],
  overrides: [
    {
      files: ['cypress/**/*.js', 'cypress.config.js'],
      extends: ['plugin:cypress/recommended'],
      env: {
        'cypress/globals': true
      }
    },
    {
      files: ['playwright/**/*.ts', 'playwright.config.ts'],
      extends: ['plugin:playwright/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      env: {
        'playwright/globals': true
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  ignorePatterns: ['backend/**/*', 'frontend/**/*']
}; 