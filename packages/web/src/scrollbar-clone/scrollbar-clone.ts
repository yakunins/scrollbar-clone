import { WithDisableScrollbar } from "./subcomponents/9-with-disable";

class ScrollbarClone extends WithDisableScrollbar {}

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

export { ScrollbarClone };
