import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";

export class CloneResizeController implements ReactiveController {
    private host: ScrollbarClone;
    private observer: ResizeObserver;
    private resizeTimeout: number | null = null;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
        this.observer = new ResizeObserver(() => {
            if (this.resizeTimeout) return;
            this.resizeTimeout = requestAnimationFrame(() => {
                this.host.handleResize();
                this.resizeTimeout = null;
            });
        });
    }

    hostConnected(): void {
        this.cleanup();
        this.observer.observe(this.host.cloneEl);
    }

    hostDisconnected(): void {
        this.cleanup();
    }

    private cleanup(): void {
        this.observer.disconnect();
        if (this.resizeTimeout !== null)
            cancelAnimationFrame(this.resizeTimeout);
        this.resizeTimeout = null;
    }
}
