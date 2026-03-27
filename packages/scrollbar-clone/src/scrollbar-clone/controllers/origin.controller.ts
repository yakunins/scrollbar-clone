import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import {
    getDocument,
    getBody,
    getHtml,
    getScrollingElement,
    getUserAgent,
} from "../utils";

const defaultSelector = ":root";

export class OriginController implements ReactiveController {
    private host: ScrollbarClone;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {
        this.resolve();
        this.host.dataset.ua = getUserAgent();
    }

    private resolve(): void {
        const raw = this.host.originSelector;
        const selector = !raw || raw === "" ? defaultSelector : raw;

        const el =
            this.host.closest(selector) ||
            getDocument(this.host)?.querySelector(selector);

        if (el) {
            if (
                el === getBody(this.host) ||
                el === getHtml(this.host)
            ) {
                this.host.originEl = getScrollingElement(
                    this.host
                ) as HTMLElement;
                this.host.originListenerEl =
                    this.host.originEl?.parentElement ||
                    getDocument(this.host);
                return;
            }
            this.host.originEl = el as HTMLElement;
            this.host.originListenerEl = el as HTMLElement;
        } else {
            this.host.originEl = null;
            this.host.originListenerEl = null;
            console.warn(
                `<scrollbar-clone>: element not found for origin-selector="${selector}"`
            );
        }
    }
}
