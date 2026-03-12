import * as React from "react";
import "scrollbar-clone";

interface ScrollbarCloneAttributes extends React.HTMLAttributes<HTMLElement> {
    "disable-scroll"?: string | boolean;
    id?: string;
    "origin-selector"?: string;
    "show-origin-scrollbar"?: string | boolean;
}

export const ScrollbarClone = React.memo(
    React.forwardRef<HTMLElement, ScrollbarCloneAttributes>(
        ({ className, ...rest }, ref) => {
            return <scrollbar-clone ref={ref} {...rest} class={className} />;
        }
    )
);

ScrollbarClone.displayName = "ScrollbarClone";
