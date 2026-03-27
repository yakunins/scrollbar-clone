type In = number | undefined | null;

export const max = (...args: In[]): number | null => {
    const numbers = args.filter((x): x is number => typeof x === "number");
    if (numbers.length < 1) return null;
    return Math.max(...numbers);
};

export const min = (...args: In[]): number | null => {
    const numbers = args.filter((x): x is number => typeof x === "number");
    if (numbers.length < 1) return null;
    return Math.min(...numbers);
};
