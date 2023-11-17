/* eslint-disable no-implicit-coercion */
import { defineConfig, devices } from "@playwright/test";

// require('dotenv').config();

const showScrollbars = {
    launchOptions: {
        ignoreDefaultArgs: ["--hide-scrollbars"],
    },
};

export default defineConfig({
    testMatch: "src/**/*.spec.ts",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [["html", { open: "never" }]],
    use: {
        baseURL: "http://127.0.0.1:3003",
        trace: "on-first-retry",
        headless: true,
        ...showScrollbars,
    },
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                ...showScrollbars,
            },
        },
        /*
        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
                ...showScrollbars,
            },
        },
        {
            name: "webkit",
            use: {
                ...devices["Desktop Safari"],
                ...showScrollbars,
            },
        },
        {
            name: "mobchrome",
            use: { ...devices["Pixel 5"], ...showScrollbars },
        },
        {
            name: "mobsafari",
            use: { ...devices["iPhone 12"], ...showScrollbars },
        },
        {
            name: "edge",
            use: {
                ...devices["Desktop Edge"],
                ...showScrollbars,
                channel: "msedge",
            },
        },
        {
            name: "chrome",
            use: {
                ...devices["Desktop Chrome"],
                ...showScrollbars,
                channel: "chrome",
            },
        },
        */
    ],

    webServer: {
        command: "npm run test-server",
        url: "http://127.0.0.1:3003",
        reuseExistingServer: !process.env.CI,
    },
});
