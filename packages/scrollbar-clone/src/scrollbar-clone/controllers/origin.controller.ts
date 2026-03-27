import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import { get, getUserAgent } from "../utils";

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
            get.document(this.host)?.querySelector(selector);

        if (el) {
            if (el === get.body(this.host) || el === get.html(this.host)) {
                this.host.originEl = get.scrollingElement(
                    this.host
                ) as HTMLElement;
                this.host.originListenerEl =
                    this.host.originEl?.parentElement ||
                    get.document(this.host);
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
