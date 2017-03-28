module.exports = {
    'plugins': [
        'react'
    ],
    'extends': [
        'plugin:react/recommended',
        'standard'
    ],
    'rules': {
        'semi': [2, 'always'],
        'object-shorthand': 2,
        'eqeqeq': 2,
        'one-var': 2,
        'no-iterator': 2,
        'prefer-arrow-callback': 2,
        'arrow-spacing': [2, { before: true, after: true }],
        'arrow-parens': [2, 'as-needed'],
        'quotes': [2, 'single'],
        'prefer-template': 2,
        'no-array-constructor': 2,
        'prefer-const': 2,
        'no-const-assign': 2,
        'no-var': 2
    },
    'env': {
        'browser': true,
        'jest': true
    }
};