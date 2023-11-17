import { WithShowOriginScrollbar } from "./6-with-show-origin-scrollbar";
import { throttle } from "./utils";

const scrollIndicatorTimeout = 200;

export class WithDataScrolling extends WithShowOriginScrollbar {
    public _indicatorTimeout: ReturnType<typeof setTimeout> | null;
    public setDataScrolling: () => void;

    constructor() {
        super();
        this._indicatorTimeout = null;
        this.setDataScrolling = throttle(setScrolling.bind(this));
    }
}

function setScrolling(this: WithDataScrolling): void {
    clearTimeout(this._indicatorTimeout!);
    this.clone.el!.dataset.scrolling = "";

    this._indicatorTimeout = setTimeout(() => {
        delete this.clone.el!.dataset.scrolling;
        this._indicatorTimeout = null;
    }, scrollIndicatorTimeout);
}
