type Callback = (timestamp?: number) => void;

export const onRaf = (callback: Callback): number | null => {
    if (typeof requestAnimationFrame !== "undefined") {
        return requestAnimationFrame(callback);
    }

    if (typeof window !== "undefined") {
        if (typeof window.requestAnimationFrame !== "undefined") {
            return window.requestAnimationFrame(callback);
        }
    }
    console.warn("onRaf(): requestAnimationFrame is not available");
    return null;
};

export const onNextRaf = (callback: Callback): (() => void) => {
    let innerId: number | null = null;
    const outerId = onRaf(() => {
        innerId = onRaf(callback);
    });
    return () => {
        if (outerId !== null) cancelAnimationFrame(outerId);
        if (innerId !== null) cancelAnimationFrame(innerId);
    };
};
