import { WithSyncScroll } from "./8-with-sync-scroll";

/*
 * Disables scroll both on clone and origin.
 * If true, attribute "data-disable-scroll" to be added onto origin.
 */

const attrName = "disable-scroll";

export class WithDisableScrollbar extends WithSyncScroll {
    static get observedAttributes(): string[] {
        return [...WithSyncScroll.observedAttributes, attrName];
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

    if (value === "true" || value === "") {
        this.clone.disableScroll = true;
        if (this.origin.el) this.origin.el.dataset.disableScroll = "true";
    } else {
        this.clone.disableScroll = false;
        if (this.origin.el?.dataset.disableScroll)
            delete this.origin.el.dataset.disableScroll;
    }
}
