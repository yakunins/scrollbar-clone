import { WithSyncScroll } from "./8-with-sync-scroll";

const attrName = "disable-scroll";

export class WithDisableScrollbar extends WithSyncScroll {
    static get observedAttributes(): string[] {
        return [...WithSyncScroll.observedAttributes, attrName];
    }

    public cloneOverlayEl: HTMLElement;

    constructor() {
        super();
        this.cloneOverlayEl = document.createElement("div");
        this.cloneOverlayEl.classList.add("scrollbar-clone__scrollbar-overlay");
    }

    connectedCallback(): void {
        super.connectedCallback();
        handleAttrChange.bind(this)();
    }

    attributeChangedCallback(attr: string, _prev: string, _next: string): void {
        super.attributeChangedCallback(attr, _prev, _next);
        if (attr === attrName) handleAttrChange.bind(this)();
    }
}

function handleAttrChange(this: WithDisableScrollbar): void {
    const value = this.getAttribute(attrName);

    if (value || value === "") this.clone.disableScroll = true;
    if (!value || value === "false") this.clone.disableScroll = false;

    appendOverlayEl.bind(this)();
}

function appendOverlayEl(this: WithDisableScrollbar): void {
    if (this.contains(this.cloneOverlayEl))
        this.removeChild(this.cloneOverlayEl);

    if (!this.clone.disableScroll) return;

    this.appendChild(this.cloneOverlayEl);
}
