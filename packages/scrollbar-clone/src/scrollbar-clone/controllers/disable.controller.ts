import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";

export class DisableController implements ReactiveController {
    private host: ScrollbarClone;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {
        this.update();
    }

    update(): void {
        if (this.host.disableScroll) {
            this.host.cloneDisableScroll = true;
            if (this.host.originEl)
                this.host.originEl.dataset.disableScroll = "true";
        } else {
            this.host.cloneDisableScroll = false;
            if (this.host.originEl?.dataset.disableScroll)
                delete this.host.originEl.dataset.disableScroll;
        }
    }
}
