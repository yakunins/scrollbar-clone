import { WithClone } from "./3-with-clone";
import { get, getScrollbarInfo, onRaf, onNextRaf } from "./utils";

export class WithOriginResize extends WithClone {
    public handleResize: () => void;
    public originResizeObserver: ResizeObserver | null;
    originResizeTimeout: number | null = null;

    constructor() {
        super();
        this.handleResize = handleResize.bind(this);
        this.originResizeObserver = new ResizeObserver(() => {
            if (this.originResizeTimeout) return;
            this.originResizeTimeout = onRaf(() => {
                this.handleResize();
                this.originResizeTimeout = null;
            });
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        onNextRaf(handleResize.bind(this)); // Wait for next animation frame after render
        if (this.origin.el) {
            this.originResizeObserver?.observe(this.origin.el);
            addListener.bind(this)();
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        removeListener.bind(this)();
        this.originResizeObserver?.disconnect();
    }
}

// Sync clone's slider size with origin
function handleResize(this: WithOriginResize): void {
    if (!this.origin.el) return;
    const { yVisibleRatio } = getScrollbarInfo(this.origin.el);
    const { height: cloneHeight } = getScrollbarInfo(this.clone.el);

    if (!yVisibleRatio) return; // no data
    this.origin.yVisibleRatio = yVisibleRatio;
    const cloneContentHeight = cloneHeight / yVisibleRatio;

    if (this.clone.content.height === cloneContentHeight) return; // clone wasn't resized
    this.clone.content.height = cloneContentHeight;

    if (yVisibleRatio === 1) return; // prevent flickering effect on height reduce
    this.clone.content.el.style.height = `${this.clone.content.height}px`;
}

function addListener(this: WithOriginResize): void {
    if (this.origin.el === get.document(this.origin.el!))
        get
            .window(this.origin.el!)
            ?.addEventListener("resize", this.handleResize);
}

function removeListener(this: WithOriginResize): void {
    if (this.origin.el === get.document(this.origin.el!))
        get
            .window(this.origin.el!)
            ?.removeEventListener("resize", this.handleResize);
}
