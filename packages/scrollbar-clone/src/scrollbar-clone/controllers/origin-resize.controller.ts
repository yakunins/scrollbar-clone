import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import { get, onRaf, onNextRaf } from "../utils";

export class OriginResizeController implements ReactiveController {
    private host: ScrollbarClone;
    private observer: ResizeObserver;
    private resizeTimeout: number | null = null;
    private cancelNextRaf: (() => void) | null = null;

    private boundHandleResize = (): void => {
        this.host.handleResize();
    };

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
        this.observer = new ResizeObserver(() => {
            if (this.resizeTimeout) return;
            this.resizeTimeout = onRaf(() => {
                this.host.handleResize();
                this.resizeTimeout = null;
            });
        });
    }

    hostConnected(): void {
        this.cleanup();
        this.cancelNextRaf = onNextRaf(this.boundHandleResize);
        if (this.host.originEl) {
            this.observer.observe(this.host.originEl);
            this.addWindowListener();
        }
    }

    hostDisconnected(): void {
        this.cleanup();
    }

    private cleanup(): void {
        this.removeWindowListener();
        this.observer.disconnect();
        if (this.resizeTimeout !== null)
            cancelAnimationFrame(this.resizeTimeout);
        this.resizeTimeout = null;
        this.cancelNextRaf?.();
        this.cancelNextRaf = null;
    }

    private addWindowListener(): void {
        if (!this.host.originEl) return;
        if (
            this.host.originEl ===
            get.scrollingElement(this.host.originEl)
        )
            get.window(this.host.originEl)?.addEventListener(
                "resize",
                this.boundHandleResize
            );
    }

    private removeWindowListener(): void {
        if (!this.host.originEl) return;
        if (
            this.host.originEl ===
            get.scrollingElement(this.host.originEl)
        )
            get.window(this.host.originEl)?.removeEventListener(
                "resize",
                this.boundHandleResize
            );
    }
}
