module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:playwright/recommended',
  ],
  overrides: [
    {
      files: ['tests/cypress/**/*.js', 'cypress/**/*.js'],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['tests/playwright/**/*.ts'],
      extends: ['plugin:playwright/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}; 