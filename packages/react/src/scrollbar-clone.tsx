import * as React from "react";
import { ScrollbarClone as WebComponent, defineElement } from "scrollbar-clone";

interface ScrollbarCloneAttributes extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    "origin-selector"?: string;
    "show-origin-scrollbar"?: string;
}

export type ScrollbarClone = React.FC<ScrollbarCloneAttributes>;

export const ScrollbarClone: ScrollbarClone = (props) => {
    return <scrollbar-clone {...props} />;
};

ScrollbarClone.displayName = "ScrollbarClone";
defineElement("scrollbar-clone", WebComponent);
