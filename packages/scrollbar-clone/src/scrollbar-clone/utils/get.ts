export const get = {
    document(obj: object) {
        return documentOf(obj);
    },
    window(obj: object) {
        return windowOf(obj);
    },
    html(obj: object) {
        return htmlOf(obj);
    },
    body(obj: object) {
        return bodyOf(obj);
    },
    scrollingElement(obj: object) {
        const scrollingElement = this.document(obj)?.scrollingElement;
        if (scrollingElement) return scrollingElement as HTMLElement;
        return this.html(obj);
    },
};

function documentOf(obj: object): Document | null {
    if (typeof Document !== "undefined" && obj instanceof Document) return obj;
    if (typeof HTMLDocument !== "undefined" && obj instanceof HTMLDocument)
        return obj;
    if (typeof Window !== "undefined" && obj instanceof Window)
        return obj.document;
    if (typeof HTMLElement !== "undefined" && obj instanceof HTMLElement)
        return obj.ownerDocument;

    return null;
}

function bodyOf(obj: object): HTMLElement | null {
    const doc = documentOf(obj);
    if (doc) return doc.body;
    return null;
}

function htmlOf(obj: object): HTMLElement | null {
    const doc = documentOf(obj);
    if (doc) return doc.documentElement;
    return null;
}

function windowOf(obj: object): Window | null {
    const doc = documentOf(obj);
    if (doc) return doc.defaultView;
    return null;
}
