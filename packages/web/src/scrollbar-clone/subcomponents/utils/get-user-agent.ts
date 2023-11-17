/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// @ts-expect-error → no need for @types/ua-parser-js here
import { UAParser } from "ua-parser-js";

type UA = {
    browser: {
        name: string;
        major: string;
    };
    device: {
        type: string;
    };
};

export const getUserAgent = (): string => {
    const ua = new UAParser().getResult() as UA;

    const browser = ua.browser.name.toLowerCase().trim().split(" ").join("_");
    const version = ua.browser.major.toLowerCase().trim().split(" ").join("_");
    const device = ua.device.type
        ? ua.device.type.toLowerCase().trim().split(" ").join("_")
        : "unknown";

    return `browser_${browser}_${version}__device_type_${device}`;
};
