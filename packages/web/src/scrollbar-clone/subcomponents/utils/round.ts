export const round = (val: number, precision = 0.0025): number => {
    return Math.round(val / precision) * precision;
};
