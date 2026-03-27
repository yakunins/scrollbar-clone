import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import { throttle } from "../utils";

const SCROLL_INDICATOR_TIMEOUT = 100;

export class ScrollIndicatorController implements ReactiveController {
    private host: ScrollbarClone;
    private timeout: ReturnType<typeof setTimeout> | null = null;
    readonly setDataScrolling: () => void;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
        this.setDataScrolling = throttle(this._setScrolling.bind(this));
    }

    hostDisconnected(): void {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = null;
    }

    private _setScrolling(): void {
        if (this.timeout) clearTimeout(this.timeout);
        this.host.dataset.scrolling = "";

        this.timeout = setTimeout(() => {
            delete this.host.dataset.scrolling;
            this.timeout = null;
        }, SCROLL_INDICATOR_TIMEOUT);
    }
}
