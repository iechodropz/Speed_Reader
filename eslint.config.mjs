import globals from 'globals';
import pluginJs from '@eslint/js';
import html from '@html-eslint/eslint-plugin';

export default [
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.jest },
        },
    },
    pluginJs.configs.recommended,
    {
        // recommended configuration included in the plugin
        ...html.configs['flat/recommended'],
        files: ['**/*.html'],
        rules: {
            ...html.configs['flat/recommended'].rules, // Must be defined. If not, all recommended rules will be lost
            '@html-eslint/indent': 'error',
            '@html-eslint/no-extra-spacing-attrs': 'off',
            '@html-eslint/require-closing-tags': 'off',
            '@html-eslint/attrs-newline': 'off',
        },
    },
];
