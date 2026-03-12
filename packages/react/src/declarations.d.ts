import "react";

interface ScrollbarCloneAttributes
    extends React.HTMLAttributes<HTMLElement> {
    class?: string;
    ref?: React.Ref<HTMLElement>;
    "disable-scrollbar"?: string | boolean;
    id?: string;
    "origin-selector"?: string;
    "show-origin-scrollbar"?: string | boolean;
}

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "scrollbar-clone": ScrollbarCloneAttributes;
        }
    }
}
