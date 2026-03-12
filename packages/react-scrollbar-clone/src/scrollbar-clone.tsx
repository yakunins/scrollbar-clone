import * as React from "react";
import "scrollbar-clone";

interface ScrollbarCloneProps extends React.HTMLAttributes<HTMLElement> {
    "disable-scroll"?: string | boolean;
    id?: string;
    "origin-selector"?: string;
    "show-origin-scrollbar"?: string | boolean;
}

export const ScrollbarClone = React.memo(
    ({ className, ...rest }: ScrollbarCloneProps & { ref?: React.Ref<HTMLElement> }) => {
        return <scrollbar-clone {...rest} class={className} />;
    }
);

ScrollbarClone.displayName = "ScrollbarClone";
