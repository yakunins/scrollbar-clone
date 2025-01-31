const defaultPrecision = 0.0005; // about half a pixel, e.g. 1080p → 1px === ~0.001

export const round = (val: number, precision = defaultPrecision): number => {
    return Math.round(val / precision) * precision;
};
