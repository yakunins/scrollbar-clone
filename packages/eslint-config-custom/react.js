const { resolve } = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    extends: [
        "@vercel/style-guide/eslint/browser",
        "@vercel/style-guide/eslint/typescript",
        "@vercel/style-guide/eslint/react",
    ].map(require.resolve),
    parserOptions: {
        project,
    },
    globals: {
        JSX: true,
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
        "react/function-component-definition": [
            "error",
            {
                namedComponents: ["function-declaration", "arrow-function"],
                unnamedComponents: "arrow-function",
            },
        ],
        "import/no-extraneous-dependencies": [
            "error",
            { devDependencies: true },
        ],
    },
};
