module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier', 'eslint-config-silence'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': 'off',
  },
};
