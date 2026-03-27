import { getHtml, getBody, getWindow } from "./get";
import { round } from "./round";
import { min, max } from "./min-max";

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
    const height = frameHeight(el);
    const contentHeight = contentY(el);
    const y = el.scrollTop;
    const yMax = contentHeight - height;
    const style = getWindow(el)?.getComputedStyle(el);
    const yIsScrollable = !(
        style?.overflowY === "hidden" || style?.overflow === "hidden"
    );

    return {
        height,
        contentHeight,
        y,
        yMax,
        yScrolledRatio: yMax > 0 ? round(y / yMax) : 0,
        yVisibleRatio: contentHeight > 0 ? round(height / contentHeight) : 1,
        yIsScrollable,
    };
};

const contentY = (el: HTMLElement): number => {
    if (el === getHtml(el)) {
        const [html, body] = [getHtml(el), getBody(el)];
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

const frameHeight = (el: HTMLElement): number => {
    if (el === getHtml(el)) {
        const [html, win] = [getHtml(el), getWindow(el)];
        return max(html?.clientHeight, win?.innerHeight) || 0;
    }
    return min(el.offsetHeight, el.clientHeight) || 0;
};
