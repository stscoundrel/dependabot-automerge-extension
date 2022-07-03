module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  plugins: [
    'jest',
    '@typescript-eslint',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
    es2020: true,
    'jest/globals': true,
  },
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
  },
};
