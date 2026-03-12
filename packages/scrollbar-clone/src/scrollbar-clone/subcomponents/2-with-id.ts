import { WithOrigin } from "./1-with-origin";

const attrName = "id";
const attrInitialValue = 0;

export class WithId extends WithOrigin {
    static get observedAttributes(): string[] {
        return [...WithOrigin.observedAttributes, attrName];
    }

    static instanceCounter = attrInitialValue;
    public cloneId: number | string;

    constructor() {
        super();
        WithId.instanceCounter += 1;
        this.cloneId = WithId.instanceCounter;
    }

    setDataAttr(): void {
        this.dataset.scrollbarClone = `clone:${this.cloneId}`;
        if (this.origin.el)
            this.origin.el.dataset.scrollbarClone = `origin:${this.cloneId}`;
    }

    connectedCallback(): void {
        super.connectedCallback();
        handleAttrChange.bind(this)();
    }

    disconnectedCallback(): void {
        delete this.origin.el?.dataset.scrollbarClone;
        delete this.dataset.scrollbarClone;
    }

    attributeChangedCallback(attr: string, _prev: string, next: string): void {
        super.attributeChangedCallback(attr, _prev, next);
        if (attr === attrName) handleAttrChange.bind(this)(next);
    }
}

function handleAttrChange(this: WithId, value?: string): void {
    this.cloneId =
        !value || value === ""
            ? this.getAttribute(attrName) || WithId.instanceCounter.toString()
            : value;
    this.setDataAttr();
}
