import * as React from "react";
import "scrollbar-clone";

interface ScrollbarCloneProps extends React.HTMLAttributes<HTMLElement> {
    "disable-scroll"?: string | boolean;
    id?: string;
    "origin-selector"?: string;
    ref?: React.Ref<HTMLElement>;
    "show-origin-scrollbar"?: string | boolean;
}

export const ScrollbarClone = React.memo(
    ({ className, ref, ...rest }: ScrollbarCloneProps) => {
        return <scrollbar-clone ref={ref} {...rest} class={className} />;
    }
);

ScrollbarClone.displayName = "ScrollbarClone";
