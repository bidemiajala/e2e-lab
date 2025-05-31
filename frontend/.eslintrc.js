module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-unused-vars': 'warn',
    'import/no-anonymous-default-export': 'off',
    'no-undef': 'error',
    'no-unused-expressions': 'off',
    'no-sequences': 'off',
    'no-mixed-operators': 'off',
    'eqeqeq': 'off',
    'no-labels': 'off',
    'no-label-var': 'off',
    'no-extra-label': 'off',
    'no-loop-func': 'off',
    'no-use-before-define': 'off',
    'array-callback-return': 'off',
    'no-restricted-globals': 'off',
    'no-func-assign': 'off',
    'no-cond-assign': 'off',
    'default-case': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['build/**/*'],
  globals: {
    'MSApp': 'readonly',
    '__REACT_DEVTOOLS_GLOBAL_HOOK__': 'readonly'
  }
}; 