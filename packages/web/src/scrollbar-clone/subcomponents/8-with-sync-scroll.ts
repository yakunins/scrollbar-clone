import { WithDataScrolling } from "./7-with-scroll-indicator";
import { getScrollbarInfo, onNextRaf, round } from "./utils";

const scrollEmitTimeout = 50;

export class WithSyncScroll extends WithDataScrolling {
    public handleScroll: (e?: Event) => void;
    public _scrollEmitter: HTMLElement | null;
    public _scrollEmitterTimeoutId: ReturnType<typeof setTimeout> | null;
    public scrolledRatio: number;
    public cloneScrollDisabled: boolean;

    constructor() {
        super();
        this.handleScroll = handleScroll.bind(this);

        this.scrolledRatio = 0;
        this.cloneScrollDisabled = false;
        this._scrollEmitter = null;
        this._scrollEmitterTimeoutId = null;
    }

    // Supress handling of scroll events subsequently emitted by `el.scrollTop = ...`
    suppressScrollHandler(nextScrollEmitter: HTMLElement): boolean {
        if (this._scrollEmitter && this._scrollEmitter !== nextScrollEmitter)
            return true;

        clearTimeout(this._scrollEmitterTimeoutId!);
        this._scrollEmitter = nextScrollEmitter;
        this._scrollEmitterTimeoutId = setTimeout(() => {
            this._scrollEmitter = null;
        }, scrollEmitTimeout);

        return false;
    }

    connectedCallback(): void {
        super.connectedCallback();
        onNextRaf(handleScroll.bind(this, undefined)); // Wait for next animation frame after render
        addListenters.bind(this)();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        removeListenters.bind(this)();
    }
}

// Handler to sync scrollbars position
function handleScroll(this: WithSyncScroll, e?: Event): void {
    if (!this.origin.el) return;

    this.handleResize();

    let from, to;
    if (e?.target === this.clone.el) {
        // scroll fired on clone
        from = this.clone.el;
        to = this.origin.el;
    } else {
        // scroll fired on origin
        from = this.origin.el;
        to = this.clone.el;
    }

    // prevent handling scroll events emmited by `el.scrollTop = ...`
    if (this.suppressScrollHandler(from)) return;

    const { yIsScrollable } = getScrollbarInfo(this.origin.el);

    // if origin is not scrollable...
    if (!yIsScrollable) {
        // ...make clone unscrollable
        this.clone.el.scrollTop =
            this.scrolledRatio * getScrollbarInfo(this.clone.el).yMax; // stick to last known scrollbar position
        return;
    }

    const { yScrolledRatio: fromScrolledRatio } = getScrollbarInfo(from);
    const { yScrolledRatio: toScrolledRatio, yMax: toScrollableHeight } =
        getScrollbarInfo(to);

    if (fromScrolledRatio === toScrolledRatio) return; // origin and clone scroll positions already in sync

    this.scrolledRatio = fromScrolledRatio;
    to.scrollTop = round(this.scrolledRatio * toScrollableHeight);

    // set "data-scrolling" attribute
    if (e) this.setDataScrolling();
}

function addListenters(this: WithSyncScroll): void {
    if (!this.origin.listenerEl) return;

    this.origin.listenerEl.addEventListener("scroll", this.handleScroll);
    this.clone.el.addEventListener("scroll", this.handleScroll);
}

function removeListenters(this: WithSyncScroll): void {
    if (!this.origin.listenerEl) return;

    this.origin.listenerEl.removeEventListener("scroll", this.handleScroll);
    this.clone.el.removeEventListener("scroll", this.handleScroll);
}
