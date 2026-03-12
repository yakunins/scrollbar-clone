import { WithOriginResize } from "./4-with-origin-resize";
import { onRaf } from "./utils";

export class WithCloneResize extends WithOriginResize {
    public cloneResizeObserver: ResizeObserver | null;
    cloneResizeTimeout: number | null = null;

    constructor() {
        super();
        this.cloneResizeObserver = new ResizeObserver(() => {
            if (this.cloneResizeTimeout) return; // prevent multiple calls in the same frame
            this.cloneResizeTimeout = onRaf(() => {
                this.handleResize();
                this.cloneResizeTimeout = null;
            });
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.cleanupCloneResize();
        this.cloneResizeObserver?.observe(this.clone.el);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.cleanupCloneResize();
    }

    private cleanupCloneResize(): void {
        this.cloneResizeObserver?.disconnect();
        if (this.cloneResizeTimeout !== null)
            cancelAnimationFrame(this.cloneResizeTimeout);
        this.cloneResizeTimeout = null;
    }
}
