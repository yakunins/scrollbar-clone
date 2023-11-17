export type DefineElement = (
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions
) => void;

export const defineElement: DefineElement = (name, constructor, options) => {
    if (customElements.get(name)) {
        // console.log(`Custom element "${name}" is already defined`);
        return;
    }

    customElements.define(name, constructor, options);
};
