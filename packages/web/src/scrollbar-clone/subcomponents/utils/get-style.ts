import { get } from "./get";

export const getStyle = (el: HTMLElement): CSSStyleDeclaration | undefined => {
    if (typeof getComputedStyle !== "undefined") {
        return getComputedStyle(el);
    }

    if (typeof get.window(el)?.getComputedStyle !== "undefined") {
        return get.window(el)?.getComputedStyle(el);
    }

    if (typeof window !== "undefined") {
        if (typeof window.getComputedStyle !== "undefined") {
            return window.getComputedStyle(el);
        }
    }
    console.log("getStyle(): getComputedStyle is not avaliable");
    return undefined;
};
