import { WithOriginResize } from "./4-with-origin-resize";

export class WithCloneResize extends WithOriginResize {
    public cloneResizeObserver: ResizeObserver | null;
    cloneResizeTimeout: number | null = null;

    constructor() {
        super();
        this.cloneResizeObserver = new ResizeObserver(() => {
            if (this.cloneResizeTimeout) return; // Prevent multiple calls in the same frame
            this.cloneResizeTimeout = requestAnimationFrame(() => {
                this.handleResize();
                this.cloneResizeTimeout = null;
            });
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
