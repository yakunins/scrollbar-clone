declare namespace JSX {
    interface IntrinsicElements {
        "lorem-ipsum": LoremIpsumAttributes;
    }
    interface LoremIpsumAttributes extends HTMLAttributes {
        words?: string;
    }
}

declare namespace JSX {
    interface IntrinsicElements {
        "scrollbar-clone": ScrollbarCloneAttributes;
    }
    interface ScrollbarCloneAttributes extends HTMLAttributes {
        "origin-selector"?: string;
        id?: string;
    }
}
