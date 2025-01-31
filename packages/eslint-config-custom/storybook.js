const { resolve } = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    extends: [
        "plugin:storybook/recommended",
        "plugin:mdx/recommended",
        ...[
            "@vercel/style-guide/eslint/node",
            "@vercel/style-guide/eslint/typescript",
            "@vercel/style-guide/eslint/browser",
            "@vercel/style-guide/eslint/react",
        ].map(require.resolve),
    ],
    parserOptions: {
        project,
    },
    globals: {
        React: true,
        JSX: true,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ["node_modules/", "dist/"],
    rules: {
        "import/no-default-export": "off",
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: ["**/*.stories.*", "**/.storybook/**/*.*"],
                peerDependencies: true,
            },
        ],
        "eslint-comments/require-description": "off",
        "no-console": "off",
    },
};
