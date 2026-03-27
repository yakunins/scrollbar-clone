# React Scrollbar Clone

React wrapper for [`scrollbar-clone`](https://www.npmjs.com/package/scrollbar-clone),
generated with [`@lit/react`](https://www.npmjs.com/package/@lit/react).

```jsx
import { ScrollbarClone } from "react-scrollbar-clone";

<ScrollbarClone
    originSelector=".with-scrollbar-clone"
    disableScroll={false}
    showOriginScrollbar={false}
    style={{ height: "500px" }}
/>;
```

## Props

| Prop | Required | Type | Description |
|---|---|---|---|
| `originSelector` | No | `string` | CSS selector of the element whose scrollbar to clone. Defaults to page (`document.scrollingElement`) |
| `showOriginScrollbar` | No | `boolean` | Whether to keep the original scrollbar visible. Default: `false` |
| `disableScroll` | No | `boolean` | Disables scroll interaction on the clone. Default: `false` |
| `id` | No | `string` | Element id. Auto-generated if omitted |

All props are optional. The simplest usage clones the page scrollbar:

```jsx
<ScrollbarClone />
```

## Peer dependencies

- `react` ^18.0.0 || ^19.0.0
- `scrollbar-clone` >=0.0.4

## Examples

- [Page scrollbar](https://yakunins.github.io/scrollbar-clone/demo1.html)
- [Multi-panel layout](https://yakunins.github.io/scrollbar-clone/demo2.html)
- [Scrollbar position](https://yakunins.github.io/scrollbar-clone/demo3.html)
