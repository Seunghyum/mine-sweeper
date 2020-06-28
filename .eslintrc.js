module.exports = {
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'airbnb',
    'airbnb/hooks',
    'prettier/react',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'simple-import-sort'],
  rules: {
    'no-console': 'warn',
    'no-eval': 'error',
    'no-alert': 0,
    'import/first': 'off',
    'import/no-unresolved': 'off', // for wepback resolver alias
    'react/jsx-filename-extension': [0],
    'react-hooks/rules-of-hooks': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'max-depth': ['error', { max: 3 }],
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'simple-import-sort/sort': 'error',
  },
}
