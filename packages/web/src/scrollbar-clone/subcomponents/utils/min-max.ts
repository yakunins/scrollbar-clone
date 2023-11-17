type In = string | number | undefined | null;
type Out = number | null;

const toNumber = (val: In): Out => {
    if (typeof val === "string") {
        const num = parseFloat(val);
        if (isNaN(num)) return null;
        return num;
    }
    if (typeof val === "number") return val;
    return null;
};

export const max = (...args: In[]): Out => {
    if (args.length < 1) return null;
    const numbers = args.map(toNumber).filter((x) => x !== null) as number[];
    if (numbers.length < 1) return null;
    return Math.max(...numbers);
};

export const min = (...args: In[]): Out => {
    if (args.length < 1) return null;
    const nums = args.map(toNumber).filter((x) => x !== null) as number[];
    if (nums.length < 1) return null;
    return Math.min(...nums);
};
