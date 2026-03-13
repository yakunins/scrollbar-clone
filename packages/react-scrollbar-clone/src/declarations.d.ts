import "react";

interface ScrollbarCloneAttributes
    extends React.HTMLAttributes<HTMLElement> {
    class?: string;
    ref?: React.Ref<HTMLElement>;
    /** Disables scroll interaction on the clone. Default: `"false"` */
    "disable-scroll"?: string | boolean;
    /** Element id. Auto-generated if omitted */
    id?: string;
    /** CSS selector of the element whose scrollbar to clone. Defaults to page (`document.scrollingElement`) */
    "origin-selector"?: string;
    /** Whether to keep the original scrollbar visible. Default: `"true"` */
    "show-origin-scrollbar"?: string | boolean;
}

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "scrollbar-clone": ScrollbarCloneAttributes;
        }
    }
}
