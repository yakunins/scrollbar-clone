import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import {
    cloneCSS,
    cloneContentCSS,
    createStyleEl,
} from "../styles/scrollbar-clone.styles";

export class CloneController implements ReactiveController {
    private host: ScrollbarClone;
    private shadowSetup = false;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {
        if (!this.host.originEl) return;

        this.host.appendChild(this.host.cloneEl);

        if (!this.shadowSetup) {
            this.host.cloneShadow.appendChild(this.host.cloneContentEl);
            this.host.cloneShadow.appendChild(
                createStyleEl(cloneContentCSS)
            );
            this.shadowSetup = true;
        }

        this.updateCSS();
    }

    updateCSS(): void {
        if (
            this.host.cloneStyleEl &&
            this.host.contains(this.host.cloneStyleEl)
        )
            this.host.removeChild(this.host.cloneStyleEl);

        this.host.cloneStyleEl = createStyleEl(cloneCSS(this.host.cloneId));
        this.host.appendChild(this.host.cloneStyleEl);
    }
}
