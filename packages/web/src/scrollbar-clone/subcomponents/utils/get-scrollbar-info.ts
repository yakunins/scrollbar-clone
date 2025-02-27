import { get } from "./get";
import { round } from "./round";
import { min, max } from "./min-max";
import { getStyle } from "./get-style";

export type ScrollbarInfo = {
    height: number;
    contentHeight: number;
    y: number;
    yMax: number;
    yScrolledRatio: number;
    yVisibleRatio: number;
    yIsScrollable: boolean;
};

export const getScrollbarInfo = (el: HTMLElement): ScrollbarInfo => {
    const height = frameSize(el).y;
    const contentHeight = contentSize(el).y;
    const y = el.scrollTop;
    const yMax = contentHeight - height;
    const yIsScrollable = !(
        getStyle(el)?.overflowY === "hidden" ||
        getStyle(el)?.overflow === "hidden"
    );

    const info = {
        height,
        contentHeight,
        y,
        yMax,
        yScrolledRatio: round(y / yMax),
        yVisibleRatio: round(height / contentHeight),
        yIsScrollable,
    };

    return info;
};

const contentY = (el: HTMLElement): number => {
    if (el === get.html(el)) {
        const [html, body] = [get.html(el), get.body(el)];
        return (
            max(
                body?.scrollHeight,
                html?.scrollHeight,
                body?.clientHeight,
                html?.clientHeight
            ) || 0
        );
    }
    return max(el.scrollHeight, el.clientHeight) || 0;
};

const contentX = (el: HTMLElement): number => {
    if (el === get.html(el)) {
        const [html, body] = [get.html(el), get.body(el)];
        return (
            max(
                body?.scrollWidth,
                html?.scrollWidth,
                body?.clientWidth,
                html?.clientWidth
            ) || 0
        );
    }
    return max(el.scrollWidth, el.clientWidth) || 0;
};

const contentSize = (el: HTMLElement): { x: number; y: number } => {
    return {
        x: contentX(el),
        y: contentY(el),
    };
};

const frameY = (el: HTMLElement): number => {
    if (el === get.html(el)) {
        const [html, win] = [get.html(el), get.window(el)];
        return max(html?.clientHeight, win?.innerHeight) || 0;
    }
    return min(el.offsetHeight, el.clientHeight) || 0;
};

const frameX = (el: HTMLElement): number => {
    if (el === get.html(el)) {
        const [html, win] = [get.html(el), get.window(el)];
        return max(html?.clientWidth, win?.innerWidth) || 0;
    }
    return min(el.offsetWidth, el.clientWidth) || 0;
};

const frameSize = (el: HTMLElement): { x: number; y: number } => {
    return {
        x: frameX(el),
        y: frameY(el),
    };
};
