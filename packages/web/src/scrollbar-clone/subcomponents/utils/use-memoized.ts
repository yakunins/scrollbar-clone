/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from "./is-equal";

type Memo<A, R> = {
    args?: A[];
    result?: R;
    timestamp?: Date;
};

type Callback<A extends any[], R> = (...args: A) => R;

/**
 * On consequent call return cached result of a `callback(args)`, if same `args` and within timeout.
 * Otherwise return calculated result of callback(args);
 */
export function useMemoizedValue<A extends any[], R>(
    callback: Callback<A, R>,
    timeout = 1000
): Callback<A, R> {
    const cached: Memo<A, R> = {};

    function setCache(value: R, args: A): void {
        cached.result = value;
        cached.args = args;
        cached.timestamp = new Date();
    }

    function isCacheExpired(): boolean {
        if (!cached.timestamp) return true;
        return new Date().getTime() - cached.timestamp.getTime() > timeout;
    }

    function isCacheValid(args: A): boolean {
        if (!cached.result || !isEqual(cached.args, args) || isCacheExpired())
            return false;
        return true;
    }

    return (...args) => {
        if (isCacheValid(args)) return cached.result!;
        const result = callback(...args);
        setCache(result, args);
        return result;
    };
}
