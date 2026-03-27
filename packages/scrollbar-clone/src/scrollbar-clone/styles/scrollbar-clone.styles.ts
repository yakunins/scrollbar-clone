const CLONE_CONTENT_WIDTH = "5px";

export const cloneCSS = (id: string | number): string => `
[data-scrollbar-clone="clone:${id}"] {
    /* desktop devices */
    &[data-ua*="device_type_unknown"] { --scrollbar-width: 17px; }
    &[data-ua*="edge"] { --scrollbar-width: 16px; }
    &[data-ua*="safari"] { --scrollbar-width: 15px; }
    /* device_type_mobile, browser_mobile */
    &[data-ua*="mobile"] { --scrollbar-width: 11px; }
}
[data-scrollbar-clone="clone:${id}"] {
    display: block;
    overflow: hidden;
    width: var(--scrollbar-width);
}
[data-scrollbar-clone="clone:${id}"] > div {
    position: absolute;
    width: var(--scrollbar-width);
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
/* disable scroll */
[data-scrollbar-clone="origin:${id}"] {
    &[data-disable-scroll*="true"] { overflow-y: hidden; }
}
[data-scrollbar-clone="clone:${id}"] {
    &[disable-scroll*="true"]:after {
        content: "";
        cursor: default;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
}
`;

export const cloneContentCSS = `
div {
    pointer-events: none;
    width: ${CLONE_CONTENT_WIDTH};
    opacity: 0;
}
`;

export const originCSS = (id: string | number): string => `
[data-scrollbar-clone="origin:${id}"] { scrollbar-width: none;}
[data-scrollbar-clone="origin:${id}"] { -ms-overflow-style: none; }
[data-scrollbar-clone="origin:${id}"]::-webkit-scrollbar { display: none;}
`;

export const createStyleEl = (stylesheet: string): HTMLElement => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(stylesheet));
    return style;
};
