import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";

export class IdController implements ReactiveController {
    private host: ScrollbarClone;
    private static counter = 0;
    private observer: MutationObserver | null = null;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
        IdController.counter += 1;
        host.cloneId = IdController.counter;
    }

    hostConnected(): void {
        this.updateId();
        this.setDataAttrs();

        this.observer = new MutationObserver(() => {
            this.updateId();
            this.setDataAttrs();
            this.host.onCloneIdChanged();
        });
        this.observer.observe(this.host, {
            attributes: true,
            attributeFilter: ["id"],
        });
    }

    hostDisconnected(): void {
        this.observer?.disconnect();
        this.observer = null;
        if (this.host.originEl?.dataset.scrollbarClone)
            delete this.host.originEl.dataset.scrollbarClone;
        delete this.host.dataset.scrollbarClone;
    }

    private updateId(): void {
        const value = this.host.getAttribute("id");
        this.host.cloneId =
            value && value !== ""
                ? value
                : IdController.counter.toString();
    }

    private setDataAttrs(): void {
        this.host.dataset.scrollbarClone = `clone:${this.host.cloneId}`;
        if (this.host.originEl)
            this.host.originEl.dataset.scrollbarClone = `origin:${this.host.cloneId}`;
    }
}
