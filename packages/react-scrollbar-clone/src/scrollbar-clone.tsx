import * as React from "react";
import { createComponent } from "@lit/react";
import { ScrollbarClone as ScrollbarCloneElement } from "scrollbar-clone";

export const ScrollbarClone = createComponent({
    tagName: "scrollbar-clone",
    elementClass: ScrollbarCloneElement,
    react: React,
});
