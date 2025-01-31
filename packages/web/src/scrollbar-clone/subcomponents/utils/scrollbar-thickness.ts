import { get } from "./get";
import { useMemoizedValue } from "./use-memoized";

type Thickness = {
    x: number;
    y: number;
};

export const scrollbarThickness = useMemoizedValue(tryScrollbarThickness);

function tryScrollbarThickness(el: HTMLElement): Thickness {
    try {
        const xy = measureScrollbarThickness(el);
        return xy;
    } catch (err) {
        console.warn("error in measureScrollbarThickness():", err);
        return { x: 17, y: 17 };
    }
}

function measureScrollbarThickness(el: HTMLElement): Thickness {
    const probeSize = 100;

    const doc = get.document(el)!;
    const body = get.body(el)!;

    const outer = doc.createElement("div");
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = `${probeSize}px`;
    outer.style.height = `${probeSize}px`;
    outer.style.overflow = "hidden";

    const inner = doc.createElement("div");
    inner.style.position = "absolute";
    inner.style.visibility = "hidden";
    inner.style.width = `100%`;
    inner.style.height = `100%`;

    const expander = doc.createElement("div");
    expander.style.width = `${probeSize * 2}px`;
    expander.style.height = `${probeSize * 2}px`;

    outer.appendChild(inner);
    outer.appendChild(expander);
    body.appendChild(outer);
    outer.style.overflow = "scroll";

    const y = probeSize - inner.offsetWidth;
    const x = probeSize - inner.offsetHeight;

    body.removeChild(outer);
    return { y, x };
}

export const defaultScrollbarThickness = (browser: string): number => {
    switch (browser) {
        case "chrome":
            return 17;
        case "firefox":
            return 17;
        case "edge":
            return 15;
        case "safari":
            return 15;
        case "mobile":
            return 10;
        case "other":
            return 17;
        default:
            return 17;
    }
};
