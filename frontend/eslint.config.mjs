//ts-check
import eslint from "@eslint/js";
import angular from "angular-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.browser } },
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...angular.configs.tsRecommended,
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            // "import/first": "error",
            // "import/newline-after-import": "error",
            // "import/no-duplicates": "error"
        },
    },
    {
        files: ["**/*.ts"],
        plugins: {
            "angular-eslint": angular,
        },
        rules: {
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase",
                },
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case",
                },
            ],
        },
    },
    // {
    //     files: ["**/*.html"],
    //     plugins: {
    //       "angular-eslint-html": angular
    //     },
    //     rules: {
    //       ...angular.configs.templateRecommended.rules,
    //       ...angular.configs.templateAccessibility.rules,
    //     },
    //   },
];