/* eslint-disable @typescript-eslint/no-explicit-any */

type Callback<T extends any[]> = (...args: T) => void;
type ThrottleState = {
    timeout?: ReturnType<typeof setTimeout>;
    started?: number;
};

export function throttle<T extends any[]>(
    callback: Callback<T>,
    delay = 30 // ~30 frames per second
): Callback<T> {
    let state: ThrottleState = {};
    return (...args) => {
        if (!state.timeout || !state.started) {
            state.started = Date.now();
            state.timeout = setTimeout(() => {
                callback(...args);
                state = {};
            }, delay);
        } else {
            const timePassed = Date.now() - state.started;
            clearTimeout(state.timeout);
            if (delay - timePassed < 0) {
                callback(...args);
                state = {};
            } else {
                state.timeout = setTimeout(() => {
                    callback(...args);
                    state = {};
                }, delay - timePassed);
            }
        }
    };
}
