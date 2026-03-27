import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import { getScrollingElement, getWindow } from "../utils";

export class OriginResizeController implements ReactiveController {
    private host: ScrollbarClone;
    private observer: ResizeObserver;
    private resizeTimeout: number | null = null;
    private initialRafId: number | null = null;
    private aborted = false;

    private boundHandleResize = (): void => {
        this.host.handleResize();
    };

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
        this.aborted = false;
        this.host.updateComplete.then(() => {
            if (this.aborted) return;
            this.initialRafId = requestAnimationFrame(
                this.boundHandleResize
            );
        });
        if (this.host.originEl) {
            this.observer.observe(this.host.originEl);
            this.addWindowListener();
        }
    }

    hostDisconnected(): void {
        this.cleanup();
    }

    private cleanup(): void {
        this.aborted = true;
        this.removeWindowListener();
        this.observer.disconnect();
        if (this.resizeTimeout !== null)
            cancelAnimationFrame(this.resizeTimeout);
        this.resizeTimeout = null;
        if (this.initialRafId !== null)
            cancelAnimationFrame(this.initialRafId);
        this.initialRafId = null;
    }

    private addWindowListener(): void {
        if (!this.host.originEl) return;
        if (
            this.host.originEl ===
            getScrollingElement(this.host.originEl)
        )
            getWindow(this.host.originEl)?.addEventListener(
                "resize",
                this.boundHandleResize
            );
    }

    private removeWindowListener(): void {
        if (!this.host.originEl) return;
        if (
            this.host.originEl ===
            getScrollingElement(this.host.originEl)
        )
            getWindow(this.host.originEl)?.removeEventListener(
                "resize",
                this.boundHandleResize
            );
    }
}
