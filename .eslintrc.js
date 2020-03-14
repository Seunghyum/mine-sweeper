const { resolve } = require('path')

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': 'warn',
    'no-eval': 'error',
    'import/first': 'off',
    'import/no-unresolved': 'off', // for wepback resolver alias
  },
}
