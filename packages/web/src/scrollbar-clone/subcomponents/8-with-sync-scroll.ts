import { WithDataScrolling } from "./7-with-scroll-indicator";
import { getScrollbarInfo, ScrollbarInfo, onNextRaf, round } from "./utils";

const scrollEmitTimeout = 50;

export class WithSyncScroll extends WithDataScrolling {
    public handleScroll: (e?: Event) => void;
    public _scrollEmitter: HTMLElement | null;
    public _scrollEmitterTimeout: ReturnType<typeof setTimeout> | null;
    public scrolledRatio: number;
    public cloneScrollDisabled: boolean;

    constructor() {
        super();
        this.handleScroll = handleScroll.bind(this);

        this.scrolledRatio = 0;
        this.cloneScrollDisabled = false;
        this._scrollEmitter = null;
        this._scrollEmitterTimeout = null;
    }

    // detect scroll events subsequently emitted by `el.scrollTop = ...`,
    // prevent infinite loop of clone-to-origin scrolls
    suppressScrollHandling(nextScrollEmitter: HTMLElement): boolean {
        if (this._scrollEmitter && this._scrollEmitter !== nextScrollEmitter)
            return true;

        if (this._scrollEmitterTimeout)
            clearTimeout(this._scrollEmitterTimeout);

        this._scrollEmitter = nextScrollEmitter;
        this._scrollEmitterTimeout = setTimeout(() => {
            this._scrollEmitter = null;
        }, scrollEmitTimeout);

        return false;
    }

    connectedCallback(): void {
        super.connectedCallback();
        onNextRaf(handleScroll.bind(this, undefined)); // skip one animation frame on first render
        addListenters.bind(this)();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        removeListenters.bind(this)();
    }
}

// handler to sync scrollbar position
function handleScroll(this: WithSyncScroll, e?: Event): void {
    if (!this.origin.el) return;

    this.handleResize(); // sync clone's scrollbar thumb size

    let from, to;
    if (e?.target === this.clone.el) {
        // clone → origin
        from = this.clone.el;
        to = this.origin.el;
    } else {
        // origin → clone
        from = this.origin.el;
        to = this.clone.el;
    }

    // prevent infinte loop of scroll events
    if (this.suppressScrollHandling(from)) return;

    const originInfo = getScrollbarInfo(this.origin.el);

    // if origin is not scrollable...
    if (!originInfo.yIsScrollable) {
        // ...stick clone's scrollbar to last known position
        this.clone.el.scrollTop =
            this.scrolledRatio * getScrollbarInfo(this.clone.el).yMax;
        return;
    }

    const cloneInfo = getScrollbarInfo(this.clone.el);
    const info = (el: HTMLElement | null): ScrollbarInfo =>
        el === this.origin.el ? originInfo : cloneInfo;

    const { yScrolledRatio: scrolledFrom } = info(from);
    const { yScrolledRatio: scrolledTo, yMax: scrollHeight } = info(to);

    if (scrolledFrom === scrolledTo) return; // origin and clone scroll positions already in sync

    this.scrolledRatio = scrolledFrom;
    to.scrollTop = round(this.scrolledRatio * scrollHeight);

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
