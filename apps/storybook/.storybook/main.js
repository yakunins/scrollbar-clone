import { dirname, join, resolve } from "path";
import react from "@vitejs/plugin-react";

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

const config = {
    stories: [
        "../stories/*.stories.tsx",
        "../stories/**/*.stories.tsx",
        "../../../packages/*/src/**/*.stories.tsx",
    ],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-docs"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },

    core: {},

    async viteFinal(config, { configType }) {
        config.plugins = config.plugins || [];
        config.plugins.push(react());
        return {
            ...config,
            define: { "process.env": {} },
        };
    },

    docs: {
        autodocs: false, // https://storybook.js.org/docs/react/writing-docs/build-documentation#preview-storybooks-documentation
    },
};

export default config;
