const defaultStep = 0.0005; // about half a pixel, e.g. 1080p → 1px === ~0.001

export const round = (val: number, step = defaultStep): number => {
    if (!step) return val;
    return Math.round(val / step) * step;
};
