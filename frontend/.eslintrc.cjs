module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@rocketseat/eslint-config/react', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
          'error',
          {
              singleQuote: true,
              endOfLine: 'auto',
              printWidth: 105,
              semi: false,
          },
      ],
  },
}
