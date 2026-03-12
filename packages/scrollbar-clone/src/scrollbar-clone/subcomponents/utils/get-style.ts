import { get } from "./get";

export const getStyle = (el: HTMLElement): CSSStyleDeclaration | undefined => {
    const win = get.window(el);
    if (win?.getComputedStyle) {
        return win.getComputedStyle(el);
    }
    console.warn("getStyle(): getComputedStyle is not available");
    return undefined;
};
