/* eslint-disable @typescript-eslint/no-explicit-any */

type Callback<T extends any[]> = (...args: T) => void;

export function throttle<T extends any[]>(
    callback: Callback<T>,
    delay = 30
): Callback<T> {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: T | null = null;
    let lastCallTime = 0;

    const invoke = (args: T): void => {
        lastCallTime = Date.now();
        callback(...args);
    };

    return (...args: T) => {
        const now = Date.now();
        const remaining = delay - (now - lastCallTime);

        lastArgs = args;

        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            invoke(args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                if (lastArgs) invoke(lastArgs);
                lastArgs = null;
            }, remaining);
        }
    };
}
