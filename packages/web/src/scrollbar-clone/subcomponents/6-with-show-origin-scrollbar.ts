import { WithCloneResize } from "./5-with-clone-resize";

const attrName = "show-origin-scrollbar";
const attrInitialValue = false;

export class WithShowOriginScrollbar extends WithCloneResize {
    static get observedAttributes(): string[] {
        return [...WithCloneResize.observedAttributes, attrName];
    }
    public showOriginScrollbar: boolean;
    public originStyleEl: HTMLElement | null;

    constructor() {
        super();
        this.showOriginScrollbar = attrInitialValue;
        this.originStyleEl = null;
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

    if (value || value === "") this.showOriginScrollbar = true;
    if (!value || value === "false") this.showOriginScrollbar = false;

    appendOriginCSS.bind(this)();
}

function appendOriginCSS(this: WithShowOriginScrollbar): void {
    if (this.originStyleEl && this.clone.el.contains(this.originStyleEl))
        this.clone.el.removeChild(this.originStyleEl);

    if (this.showOriginScrollbar) return;

    this.originStyleEl = createStyle(originCSS(this.cloneId));
    this.clone.el.appendChild(this.originStyleEl);
}

const createStyle = (stylesheet: string): HTMLElement => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(stylesheet));
    return style;
};
