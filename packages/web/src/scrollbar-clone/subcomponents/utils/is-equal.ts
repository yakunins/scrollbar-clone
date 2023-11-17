/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const isEqual = (x: any, y: any): boolean => {
    if (x === y) {
        return true;
    }

    if (
        typeof x === "object" &&
        x !== null &&
        typeof y === "object" &&
        y !== null
    ) {
        if (Object.keys(x as object).length !== Object.keys(y as object).length)
            return false;

        for (const prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!isEqual(x[prop], y[prop])) return false;
            } else return false;
        }

        return true;
    }
    return false;
};
