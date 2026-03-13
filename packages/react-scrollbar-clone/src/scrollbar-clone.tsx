import * as React from "react";
import "scrollbar-clone";

interface ScrollbarCloneProps extends React.HTMLAttributes<HTMLElement> {
    /** Disables scroll interaction on the clone. Default: `"false"` */
    "disable-scroll"?: string | boolean;
    /** Element id. Auto-generated if omitted */
    id?: string;
    /** CSS selector of the element whose scrollbar to clone. Defaults to page (`document.scrollingElement`) */
    "origin-selector"?: string;
    /** Whether to keep the original scrollbar visible. Default: `"true"` */
    "show-origin-scrollbar"?: string | boolean;
}

export const ScrollbarClone = React.memo(
    ({ className, ...rest }: ScrollbarCloneProps & { ref?: React.Ref<HTMLElement> }) => {
        return <scrollbar-clone {...rest} class={className} />;
    }
);

ScrollbarClone.displayName = "ScrollbarClone";
