/* eslint-disable @typescript-eslint/no-explicit-any */

type Callback<T extends any[]> = (...args: T) => void;
type ThrottleState = {
    timeout?: ReturnType<typeof setTimeout>;
    started?: Date;
};

export function throttle<T extends any[]>(
    callback: Callback<T>,
    delay = 30 // ~30 frames per second
): Callback<T> {
    let state: ThrottleState = {};
    return (...args) => {
        if (!state.timeout || !state.started) {
            state.started = new Date();
            state.timeout = setTimeout(() => {
                callback(...args);
                state = {};
            }, delay);
        } else {
            const timePassed = new Date().getTime() - state.started.getTime();
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
