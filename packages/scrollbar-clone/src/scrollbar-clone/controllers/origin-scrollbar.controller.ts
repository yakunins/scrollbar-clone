import type { ReactiveController } from "lit";
import type { ScrollbarClone } from "../scrollbar-clone";
import { originCSS, createStyleEl } from "../styles/scrollbar-clone.styles";

export class OriginScrollbarController implements ReactiveController {
    private host: ScrollbarClone;
    private styleEl: HTMLElement | null = null;

    constructor(host: ScrollbarClone) {
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {
        this.update();
    }

    update(): void {
        if (this.styleEl && this.host.cloneEl.contains(this.styleEl))
            this.host.cloneEl.removeChild(this.styleEl);

        if (this.host.showOriginScrollbar) return;

        this.styleEl = createStyleEl(originCSS(this.host.cloneId));
        this.host.cloneEl.appendChild(this.styleEl);
    }
}
