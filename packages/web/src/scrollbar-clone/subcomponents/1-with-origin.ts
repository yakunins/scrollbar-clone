import { get, getUserAgent } from "./utils";

const attrName = "origin-selector";
const defaultSelector = ":root";

export class WithOrigin extends HTMLElement {
    static get observedAttributes(): string[] {
        return [attrName];
    }
    public origin: {
        selector: string;
        el: HTMLElement | null;
        listenerEl: HTMLElement | Document | null;
        yVisibleRatio?: number;
    };
    public setOrigin: () => void;

    constructor() {
        if (document.compatMode === "BackCompat")
            console.warn(`<scrollbar-clone>: quirks mode is not supported`);

        super();
        this.setOrigin = setOrigin.bind(this);
        this.origin = {
            selector: defaultSelector,
            el: null,
            listenerEl: null,
        };
    }

    connectedCallback(): void {
        this.setOrigin();

        // Provides selector data-user-agent="browser_chrome_116__device_type_mobile"
        this.dataset.ua = getUserAgent();
    }

    attributeChangedCallback(attr: string, _prev: string, _next: string): void {
        if (attr === attrName && _prev)
            console.warn(
                `<scrollbar-clone>: attribute "${attrName}" is not supposed to be changed (${_prev} → ${_next})`
            );
    }
}

export function setOrigin(this: WithOrigin): void {
    const selector = this.getAttribute(attrName);

    if (!selector || selector === "") {
        this.origin.selector = defaultSelector;
    } else {
        this.origin.selector = selector;
    }

    const setOriginRoot = (): void => {
        this.origin.el = get.scrollingElement(this);
        this.origin.listenerEl =
            this.origin.el?.parentElement || get.document(this);
    };

    const el =
        this.closest(this.origin.selector) ||
        get.document(this)?.querySelector(this.origin.selector);

    if (el) {
        if (el === get.body(this) || el === get.html(this)) {
            setOriginRoot();
            return;
        }
        this.origin.el = el as HTMLElement;
        this.origin.listenerEl = el as HTMLElement;
    } else {
        this.origin.el = null;
        this.origin.listenerEl = null;
        console.warn(
            `<scrollbar-clone>: element not found for ${attrName}="${this.origin.selector}"`
        );
    }
}
