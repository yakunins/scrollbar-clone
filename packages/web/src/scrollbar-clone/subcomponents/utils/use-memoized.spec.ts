import { test, expect } from "@playwright/test";
import { useMemoizedValue } from "./use-memoized";

const rnd = (upTo = 100): number => Math.floor(Math.random() * (upTo + 1));
const wait = (delay = 1000): Promise<number> =>
    new Promise((res) => {
        setTimeout(() => {
            res(rnd(100));
        }, delay);
    });

test("useMemoized(fn): fn to be called once if same args", () => {
    const fn = (a: string, b: string): string => {
        counter++;
        return a + b;
    };
    const memoized = useMemoizedValue(fn);
    let counter = 0;
    let result = "";

    result = fn("a", "b");
    expect(result).toBe("ab");
    expect(counter).toBe(1);

    result = memoized("c", "d");
    expect(result).toBe("cd");
    expect(counter).toBe(2);

    result = memoized("c", "d");
    expect(result).toBe("cd");
    expect(counter).toBe(2); // use prev value

    result = memoized("e", "f");
    expect(result).toBe("ef");
    expect(counter).toBe(3);
});

test("useMemoized(fn, 100): fn to be called if 100ms passed", async () => {
    const timeout = 100;
    const fn = (a: string, b: string): string => {
        counter++;
        return a + b;
    };
    const memoized = useMemoizedValue(fn, timeout);
    let counter = 0;
    let result = "";

    result = memoized("c", "d");
    expect(result).toBe("cd");
    expect(counter).toBe(1);

    await wait(10);

    result = memoized("c", "d");
    expect(result).toBe("cd");
    expect(counter).toBe(1);

    await wait(timeout + 1);

    result = memoized("c", "d");
    expect(result).toBe("cd");
    expect(counter).toBe(2);
});
