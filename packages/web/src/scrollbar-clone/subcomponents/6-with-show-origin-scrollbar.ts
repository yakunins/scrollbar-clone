import { WithCloneResize } from "./5-with-clone-resize";

const attrName = "show-origin-scrollbar";

export class WithShowOriginScrollbar extends WithCloneResize {
    static get observedAttributes(): string[] {
        return [...WithCloneResize.observedAttributes, attrName];
    }
    public showOriginScrollbar: boolean;
    public originStyleEl: HTMLElement | null;

    constructor() {
        super();
        this.showOriginScrollbar = false; // initial state and fallback value
        this.originStyleEl = null;
    }

    setOriginCSS(): void {
        if (!this.clone.el) return;

        if (this.originStyleEl && this.clone.el.contains(this.originStyleEl))
            this.clone.el.removeChild(this.originStyleEl);

        if (this.showOriginScrollbar) return;

        this.originStyleEl = createStyle(originCSS(this.cloneId));
        this.clone.el.appendChild(this.originStyleEl);
    }

    connectedCallback(): void {
        super.connectedCallback();
        handleAttrChange.bind(this)();
    }

    attributeChangedCallback(attr: string, _prev: string, _next: string): void {
        super.attributeChangedCallback(attr, _prev, _next);
        if (attr === attrName || attr === "id") handleAttrChange.bind(this)();
    }
}

const originCSS = (id: string | number): string => `
[data-scrollbar-clone="origin:${id}"] { scrollbar-width: none;}
[data-scrollbar-clone="origin:${id}"] { -ms-overflow-style: none; }
[data-scrollbar-clone="origin:${id}"]::-webkit-scrollbar { display: none;}
`;

function handleAttrChange(this: WithShowOriginScrollbar): void {
    const value = this.getAttribute(attrName);
    this.showOriginScrollbar = false;
    if (value) this.showOriginScrollbar = true;
    if (value === "") this.showOriginScrollbar = true;
    if (value === "false") this.showOriginScrollbar = false;
    this.setOriginCSS();
}

const createStyle = (stylesheet: string): HTMLElement => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(stylesheet));
    return style;
};
