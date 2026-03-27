import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import { getScrollbarInfo, type ScrollbarInfo, onNextRaf, round } from "../utils";

const SCROLL_EMIT_TIMEOUT = 50;

export class SyncScrollController implements ReactiveController {
    private host: ScrollbarClone;
    private scrollEmitter: HTMLElement | null = null;
    private scrollEmitterTimeout: ReturnType<typeof setTimeout> | null = null;
    private cancelScrollRaf: (() => void) | null = null;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {
        this.cleanup();
        this.cancelScrollRaf = onNextRaf(() => this.handleScroll());
        this.addListeners();
    }

    hostDisconnected(): void {
        this.cleanup();
    }

    private cleanup(): void {
        this.removeListeners();
        this.cancelScrollRaf?.();
        this.cancelScrollRaf = null;
        if (this.scrollEmitterTimeout)
            clearTimeout(this.scrollEmitterTimeout);
        this.scrollEmitterTimeout = null;
        this.scrollEmitter = null;
    }

    private handleScroll = (e?: Event): void => {
        if (!this.host.originEl) return;

        this.host.handleResize();

        let from: HTMLElement, to: HTMLElement;
        if (e?.target === this.host.cloneEl) {
            from = this.host.cloneEl;
            to = this.host.originEl;
        } else {
            from = this.host.originEl;
            to = this.host.cloneEl;
        }

        if (this.suppressScrollHandling(from)) return;

        const originInfo = getScrollbarInfo(this.host.originEl);

        if (!originInfo.yIsScrollable) {
            this.host.cloneEl.scrollTop =
                this.host.scrolledRatio *
                getScrollbarInfo(this.host.cloneEl).yMax;
            return;
        }

        const cloneInfo = getScrollbarInfo(this.host.cloneEl);
        const info = (el: HTMLElement | null): ScrollbarInfo =>
            el === this.host.originEl ? originInfo : cloneInfo;

        const { yScrolledRatio: scrolledFrom } = info(from);
        const { yScrolledRatio: scrolledTo, yMax: scrollHeight } = info(to);

        if (scrolledFrom === scrolledTo) return;

        this.host.scrolledRatio = scrolledFrom;
        to.scrollTop = round(this.host.scrolledRatio * scrollHeight);

        if (e) this.host.setDataScrolling();
    };

    private suppressScrollHandling(nextScrollEmitter: HTMLElement): boolean {
        if (this.scrollEmitter && this.scrollEmitter !== nextScrollEmitter)
            return true;

        if (this.scrollEmitterTimeout)
            clearTimeout(this.scrollEmitterTimeout);

        this.scrollEmitter = nextScrollEmitter;
        this.scrollEmitterTimeout = setTimeout(() => {
            this.scrollEmitter = null;
        }, SCROLL_EMIT_TIMEOUT);

        return false;
    }

    private addListeners(): void {
        if (!this.host.originListenerEl) return;
        this.host.originListenerEl.addEventListener(
            "scroll",
            this.handleScroll
        );
        this.host.cloneEl.addEventListener("scroll", this.handleScroll);
    }

    private removeListeners(): void {
        if (!this.host.originListenerEl) return;
        this.host.originListenerEl.removeEventListener(
            "scroll",
            this.handleScroll
        );
        this.host.cloneEl.removeEventListener("scroll", this.handleScroll);
    }
}
