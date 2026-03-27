import { LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import type { ComplexAttributeConverter } from "lit";

import { OriginController } from "./controllers/origin.controller";
import { IdController } from "./controllers/id.controller";
import { CloneController } from "./controllers/clone.controller";
import { OriginResizeController } from "./controllers/origin-resize.controller";
import { CloneResizeController } from "./controllers/clone-resize.controller";
import { OriginScrollbarController } from "./controllers/origin-scrollbar.controller";
import { ScrollIndicatorController } from "./controllers/scroll-indicator.controller";
import { SyncScrollController } from "./controllers/sync-scroll.controller";
import { DisableController } from "./controllers/disable.controller";
import { getScrollbarInfo } from "./utils";

/**
 * Matches original attribute handling: "false" string is falsy,
 * absent attribute is falsy, everything else (including "") is truthy.
 * Lit's built-in Boolean type treats any present attribute as true.
 */
const stringBoolConverter: ComplexAttributeConverter<boolean> = {
    fromAttribute(value: string | null): boolean {
        return value !== null && value !== "false";
    },
    toAttribute(value: boolean): string | null {
        return value ? "" : null;
    },
};

export class ScrollbarClone extends LitElement {
    @property({ attribute: "origin-selector" })
    originSelector = "";

    @property({ converter: stringBoolConverter, attribute: "show-origin-scrollbar" })
    showOriginScrollbar = false;

    @property({ converter: stringBoolConverter, attribute: "disable-scroll" })
    disableScroll = false;

    // DOM state
    originEl: HTMLElement | null = null;
    originListenerEl: HTMLElement | Document | null = null;
    yVisibleRatio?: number;
    scrolledRatio = 0;
    cloneContentHeight?: number;
    cloneDisableScroll = false;

    readonly cloneEl: HTMLElement;
    readonly cloneShadow: ShadowRoot;
    readonly cloneContentEl: HTMLElement;
    cloneStyleEl: HTMLElement | null = null;
    cloneId: number | string = 0;

    // Controllers (registered in dependency order)
    private _origin: OriginController;
    private _id: IdController;
    private _clone: CloneController;
    private _originResize: OriginResizeController;
    private _cloneResize: CloneResizeController;
    private _originScrollbar: OriginScrollbarController;
    private _scrollIndicator: ScrollIndicatorController;
    private _syncScroll: SyncScrollController;
    private _disable: DisableController;

    constructor() {
        super();

        if (document.compatMode === "BackCompat")
            console.warn(
                "<scrollbar-clone>: quirks mode is not supported"
            );

        // Create clone DOM structure (shadow root on inner div, not on host)
        this.cloneEl = document.createElement("div");
        this.cloneEl.classList.add("scrollbar-clone__scrollbar");
        this.cloneShadow = this.cloneEl.attachShadow({ mode: "open" });
        this.cloneContentEl = document.createElement("div");

        // Order matters: controllers' hostConnected fires in registration order
        this._origin = new OriginController(this);
        this._id = new IdController(this);
        this._clone = new CloneController(this);
        this._originResize = new OriginResizeController(this);
        this._cloneResize = new CloneResizeController(this);
        this._originScrollbar = new OriginScrollbarController(this);
        this._scrollIndicator = new ScrollIndicatorController(this);
        this._syncScroll = new SyncScrollController(this);
        this._disable = new DisableController(this);
    }

    // Render to light DOM (no shadow on host), matching original behavior
    createRenderRoot(): this {
        return this;
    }

    render(): typeof nothing {
        return nothing;
    }

    attributeChangedCallback(
        name: string,
        old: string | null,
        value: string | null
    ): void {
        super.attributeChangedCallback(name, old, value);
        if (name === "origin-selector" && old !== null) {
            console.warn(
                `<scrollbar-clone>: attribute "origin-selector" is not supposed to be altered (${old} → ${value})`
            );
        }
    }

    protected updated(changed: PropertyValues): void {
        if (changed.has("showOriginScrollbar")) {
            this._originScrollbar.update();
        }
        if (changed.has("disableScroll")) {
            this._disable.update();
        }
    }

    /** Sync clone scrollbar thumb size with origin's scroll state */
    handleResize(): void {
        if (!this.originEl) return;
        const { yVisibleRatio } = getScrollbarInfo(this.originEl);
        const { height: cloneHeight } = getScrollbarInfo(this.cloneEl);

        if (!yVisibleRatio) return;
        this.yVisibleRatio = yVisibleRatio;
        const cloneContentHeight = cloneHeight / yVisibleRatio;

        if (this.cloneContentHeight === cloneContentHeight) return;
        this.cloneContentHeight = cloneContentHeight;

        if (yVisibleRatio === 1) return;
        this.cloneContentEl.style.height = `${this.cloneContentHeight}px`;
    }

    /** Set data-scrolling attribute (delegates to ScrollIndicatorController) */
    setDataScrolling(): void {
        this._scrollIndicator.setDataScrolling();
    }

    /** Called by IdController when the clone ID changes */
    onCloneIdChanged(): void {
        this._clone.updateCSS();
        this._originScrollbar.update();
    }
}

const elementName = "scrollbar-clone";
if (!customElements.get(elementName))
    customElements.define(elementName, ScrollbarClone);

declare global {
    interface HTMLElementTagNameMap {
        "scrollbar-clone": typeof ScrollbarClone;
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "scrollbar-clone": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}
