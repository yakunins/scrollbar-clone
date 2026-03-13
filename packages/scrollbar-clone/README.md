# Scrollbar Clone

Lightweight web component that allows scrollbar to have custom margins, positioning, etc.  
It effectively transforms the scrollbar into a regular HTML element

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

Examples:

-   [Page scrollbar demo](https://yakunins.github.io/scrollbar-clone/demo1.html)
-   [Three-column layout demo](https://yakunins.github.io/scrollbar-clone/demo2.html)
