/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from "./is-equal";

type Memo<A, R> = {
    args?: A[];
    result?: R;
    timestamp?: number;
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
        cached.timestamp = Date.now();
    }

    function isCacheExpired(): boolean {
        if (!cached.timestamp) return true;
        return Date.now() - cached.timestamp > timeout;
    }

    function isCacheValid(args: A): boolean {
        if (cached.result === undefined || !isEqual(cached.args, args) || isCacheExpired())
            return false;
        return true;
    }

    return (...args) => {
        if (isCacheValid(args)) return cached.result as R;
        const result = callback(...args);
        setCache(result, args);
        return result;
    };
}
