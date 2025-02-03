import { WithId } from "./2-with-id";

/*
 * Prevents collapsing scrollbar clone into nothing when zoom level < 33%
 */
const cloneContentWidth = "5px";

export class WithClone extends WithId {
    public clone: {
        content: {
            el: HTMLElement;
            height?: number;
        };
        el: HTMLElement;
        shadow: ShadowRoot | null;
        styleEl: HTMLElement | null;
        disableScroll: boolean;
    };

    constructor() {
        super();
        this.clone = {
            el: document.createElement("div"),
            styleEl: null,
            shadow: null,
            content: {
                el: document.createElement("div"),
            },
            disableScroll: false,
        };
        this.clone.shadow = this.clone.el.attachShadow({ mode: "open" });
        this.clone.el.classList.add("scrollbar-clone__scrollbar");
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.origin.el) return; // Exit fast if no origin

        this.appendChild(this.clone.el);
        setCloneCSS.bind(this)();

        this.clone.shadow?.appendChild(this.clone.content.el);
        this.clone.shadow?.appendChild(createStyleEl(cloneContentCSS));
    }

    attributeChangedCallback(attr: string, _prev: string, _next: string): void {
        super.attributeChangedCallback(attr, _prev, _next);
        if (attr === "id") setCloneCSS.bind(this)();
    }
}

const cloneCSS = (id: string | number): string => `
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
`;

const cloneContentCSS = `
div {
    pointer-events: none;
    width: ${cloneContentWidth};
    opacity: 0;
}
`;

const disableScrollCSS = (id: string | number): string => `
[data-scrollbar-clone="origin:${id}"] {
    &[data-disable-scroll*="true"] { overflow-y: hidden; }
}
[data-scrollbar-clone="clone:${id}"] {
    &[disable-scroll*="true"] { pointer-events: none; }
}
`;

function setCloneCSS(this: WithClone): void {
    if (this.contains(this.clone.styleEl))
        this.removeChild(this.clone.styleEl!);

    this.clone.styleEl = createStyleEl(
        cloneCSS(this.cloneId) + disableScrollCSS(this.cloneId)
    );
    this.appendChild(this.clone.styleEl);
}

const createStyleEl = (stylesheet: string): HTMLElement => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(stylesheet));
    return style;
};
