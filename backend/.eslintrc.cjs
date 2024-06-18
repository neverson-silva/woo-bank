module.exports = {
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                endOfLine: 'auto',
                printWidth: 105,
                semi: false,
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        //   '@typescript-eslint/ban-ts-comment': 'warn',
        //   '@typescript-eslint/no-unused-vars': 'warn',
        //   'perfectionist/sort-interfaces': 'error',
        //   'no-useless-constructor': 'off',
        //   'no-use-before-define': 'off',
        //   'no-useless-call': 'off',
    },
    extends: ['@rocketseat/eslint-config/node'],
}