import { WithClone } from "./3-with-clone";
import { get, throttle, getScrollbarInfo, onNextRaf } from "./utils";

const resizeTimeout = 20; // ~30 frames per secons

export class WithOriginResize extends WithClone {
    public handleResize: () => void;
    public originResizeObserver: ResizeObserver | null;

    constructor() {
        super();
        this.handleResize = throttle(handleResize.bind(this), resizeTimeout);
        this.originResizeObserver = new ResizeObserver(() => {
            this.handleResize();
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        onNextRaf(handleResize.bind(this)); // Wait for next animation frame after render
        if (this.origin.el) {
            this.originResizeObserver?.observe(this.origin.el);
            addWindowListener.bind(this)();
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        removeWindowListener.bind(this)();
        this.originResizeObserver?.disconnect();
    }
}

// Sync clone's slider size with origin
function handleResize(this: WithOriginResize): void {
    if (!this.origin.el) return;
    const { yVisibleRatio } = getScrollbarInfo(this.origin.el);
    const { height: cloneHeight } = getScrollbarInfo(this.clone.el);

    if (!yVisibleRatio) return;

    this.origin.yVisibleRatio = yVisibleRatio;
    const cloneContentHeight = cloneHeight / yVisibleRatio;

    if (this.clone.content.height === cloneContentHeight) return;

    this.clone.content.height = cloneContentHeight;
    this.clone.content.el.style.height = `${this.clone.content.height}px`;

    // if (this.handleScroll) this.handleScroll();
}

function addWindowListener(this: WithOriginResize): void {
    if (this.origin.el === get.document(this.origin.el!))
        get
            .window(this.origin.el!)
            ?.addEventListener("resize", this.handleResize);
}

function removeWindowListener(this: WithOriginResize): void {
    if (this.origin.el === get.document(this.origin.el!))
        get
            .window(this.origin.el!)
            ?.removeEventListener("resize", this.handleResize);
}
