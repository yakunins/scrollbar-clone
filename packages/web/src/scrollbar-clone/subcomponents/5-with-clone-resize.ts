import { WithOriginResize } from "./4-with-origin-resize";

export class WithCloneResize extends WithOriginResize {
    public cloneResizeObserver: ResizeObserver | null;

    constructor() {
        super();
        this.cloneResizeObserver = new ResizeObserver(() => {
            this.handleResize();
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.cloneResizeObserver?.observe(this.clone.el);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.cloneResizeObserver?.disconnect();
    }
}
