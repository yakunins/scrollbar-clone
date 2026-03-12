import { UAParser } from "ua-parser-js";

export const getUserAgent = (): string => {
    const ua = new UAParser().getResult();

    const browser = (ua.browser.name ?? "unknown").toLowerCase().trim().split(" ").join("_");
    const version = (ua.browser.major ?? "unknown").toLowerCase().trim().split(" ").join("_");
    const device = ua.device.type
        ? ua.device.type.toLowerCase().trim().split(" ").join("_")
        : "unknown";

    return `browser_${browser}_${version}__device_type_${device}`;
};
