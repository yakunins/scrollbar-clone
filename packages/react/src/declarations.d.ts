declare namespace JSX {
    interface IntrinsicElements {
        "scrollbar-clone": ScrollbarCloneAttributes;
    }
    interface ScrollbarCloneAttributes extends HTMLAttributes {
        class?: string;
        ref?: React.Ref<HTMLElement>;
        "disable-scrollbar"?: string | boolean;
        id?: string;
        "origin-selector"?: string;
        "show-origin-scrollbar"?: string | boolean;
    }
}
