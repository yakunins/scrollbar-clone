export function getDocument(obj: object): Document | null {
    if (typeof Document !== "undefined" && obj instanceof Document) return obj;
    if (typeof Window !== "undefined" && obj instanceof Window)
        return obj.document;
    if (typeof HTMLElement !== "undefined" && obj instanceof HTMLElement)
        return obj.ownerDocument;
    return null;
}

export function getWindow(obj: object): Window | null {
    const doc = getDocument(obj);
    return doc ? doc.defaultView : null;
}

export function getHtml(obj: object): HTMLElement | null {
    const doc = getDocument(obj);
    return doc ? doc.documentElement : null;
}

export function getBody(obj: object): HTMLElement | null {
    const doc = getDocument(obj);
    return doc ? doc.body : null;
}

export function getScrollingElement(obj: object): HTMLElement | null {
    const doc = getDocument(obj);
    const el = doc?.scrollingElement;
    if (el) return el as HTMLElement;
    return getHtml(obj);
}
