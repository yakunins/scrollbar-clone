import * as React from "react";
import "scrollbar-clone";

export type Lorem = React.FC<React.PropsWithChildren>;

export const Lorem: Lorem = ({ children, ...rest }) => {
    return <p {...rest}>{children ?? <lorem-ipsum />}</p>;
};

Lorem.displayName = "Lorem";
