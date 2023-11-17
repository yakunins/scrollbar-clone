type Callback = (timestamp?: number) => void;

const onRaf = (callback: Callback): void => {
    if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(callback);
        return;
    }

    if (typeof window !== "undefined") {
        if (typeof window.requestAnimationFrame !== "undefined") {
            window.requestAnimationFrame(callback);
            return;
        }
    }
    console.log("raf(): requestAnimationFrame is not avaliable");
};

export const onNextRaf = (callback: Callback): void => {
    onRaf(() => {
        onRaf(callback);
    });
};
