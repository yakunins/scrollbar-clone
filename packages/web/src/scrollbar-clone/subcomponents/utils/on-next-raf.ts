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
    console.warn("onRaf(): requestAnimationFrame is not avaliable");
    return null;
};

export const onNextRaf = (callback: Callback): number | null => {
    return onRaf(() => {
        onRaf(callback);
    });
};
