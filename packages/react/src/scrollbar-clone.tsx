import * as React from "react";
import "scrollbar-clone";

interface ScrollbarCloneAttributes extends React.HTMLAttributes<HTMLElement> {
    "disable-scroll"?: string | boolean;
    id?: string;
    "origin-selector"?: string;
    "show-origin-scrollbar"?: string | boolean;
}

export type ScrollbarClone = React.FC<ScrollbarCloneAttributes>;

export const ScrollbarClone: ScrollbarClone = (props) => {
    return <scrollbar-clone {...props} />;
};

ScrollbarClone.displayName = "ScrollbarClone";
