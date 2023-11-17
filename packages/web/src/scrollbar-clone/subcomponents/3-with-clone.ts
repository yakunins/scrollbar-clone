import { WithId } from "./2-with-id";
import { getUserAgent } from "./utils";

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
        el: HTMLElement | null;
        shadow: ShadowRoot | null;
        styleEl: HTMLElement | null;
    };

    constructor() {
        super();
        this.clone = {
            el: this,
            styleEl: null,
            shadow: this.attachShadow({ mode: "open" }),
            content: {
                el: document.createElement("div"),
            },
        };
    }

    appendCloneCSS(): void {
        if (this.clone.styleEl) this.clone.el!.removeChild(this.clone.styleEl);
        this.clone.styleEl = createStyle(cloneCSS(this.cloneId));
        this.clone.el!.appendChild(this.clone.styleEl);
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.appendCloneCSS();
        this.clone.shadow?.appendChild(this.clone.content.el);
        const contentStyleEl = createStyle(contentCSS);
        this.clone.shadow?.appendChild(contentStyleEl);

        // Required for handling zero-width scrollbars in Firefox and mobile browsers
        this.clone.el!.dataset.userAgent = getUserAgent();
    }

    attributeChangedCallback(attr: string, _prev: string, _next: string): void {
        super.attributeChangedCallback(attr, _prev, _next);
        if (attr === "id") this.appendCloneCSS();
    }
}

const cloneCSS = (id: string | number): string => `
[data-scrollbar-clone="clone:${id}"] {
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    width: var(--scrollbar-width);

    /* desktop devices */
    &[data-user-agent*="device_type_unknown"] { --scrollbar-width: 17px; }
    &[data-user-agent*="edge"] { --scrollbar-width: 16px; }
    &[data-user-agent*="safari"] { --scrollbar-width: 15px; }

    /* device_type_mobile, browser_mobile */
    &[data-user-agent*="mobile"] {
        --scrollbar-width: 11px;
        pointer-events: none;
    }
}
`;

const contentCSS = `
div {
    pointer-events: none;
    width: ${cloneContentWidth};
    opacity: 0;
}
`;

const createStyle = (stylesheet: string): HTMLElement => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(stylesheet));
    return style;
};
