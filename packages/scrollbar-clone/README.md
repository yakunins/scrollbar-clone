# Scrollbar Clone

Turns a scrollbar into a normal HTML element.  
Lightweight web component that allows scrollbar to have custom margins, positioning, etc.  
Built with [Lit](https://lit.dev/).

## Examples

- [Page scrollbar](https://yakunins.github.io/scrollbar-clone/demo1.html)
- [Multi-panel layout](https://yakunins.github.io/scrollbar-clone/demo2.html)
- [Scrollbar position](https://yakunins.github.io/scrollbar-clone/demo3.html)


```html
<scrollbar-clone
    origin-selector=".with-scrollbar-clone"
    disable-scroll="false"
    show-origin-scrollbar="false"
    style="height: 500px;"
/>
```

## Attributes

| Attribute | Required | Values | Description |
|---|---|---|---|
| `origin-selector` | No | CSS selector | Element whose scrollbar to clone. Defaults to page (`document.scrollingElement`) |
| `show-origin-scrollbar` | No | `"true"` \| `"false"` | Whether to keep the original scrollbar visible. Default: `"true"` |
| `disable-scroll` | No | `"true"` \| `"false"` | Disables scroll interaction on the clone. Default: `"false"` |
| `id` | No | string | Element id. Auto-generated if omitted |

All attributes are optional. The simplest usage clones the page scrollbar:

```html
<scrollbar-clone></scrollbar-clone>
```

## Architecture

The component extends `LitElement` and uses reactive controllers for each concern:

| Controller | Responsibility |
|---|---|
| `OriginController` | Resolves the origin element from `origin-selector` |
| `IdController` | Manages clone IDs and `data-scrollbar-clone` attributes |
| `CloneController` | Creates the clone div, shadow DOM, and CSS |
| `OriginResizeController` | Tracks origin size via `ResizeObserver` |
| `CloneResizeController` | Tracks clone size via `ResizeObserver` |
| `OriginScrollbarController` | Hides/shows the origin's native scrollbar |
| `ScrollIndicatorController` | Sets `data-scrolling` attribute during scroll |
| `SyncScrollController` | Synchronizes scroll position between origin and clone |
| `DisableController` | Disables scroll on both origin and clone |

## Dependencies

- [`lit`](https://www.npmjs.com/package/lit) — reactive web component base
- [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js) — browser/device detection for scrollbar width
