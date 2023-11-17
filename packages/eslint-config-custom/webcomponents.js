const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    extends: [
        "@vercel/style-guide/eslint/browser",
        "@vercel/style-guide/eslint/typescript",
    ].map(require.resolve),
    parserOptions: {
        project,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
    rules: {
        "import/no-default-export": "off",
        "no-console": "off",
        "eslint-comments/require-description": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
    },
};
