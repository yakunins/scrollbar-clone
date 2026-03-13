# React Scrollbar Clone

Lightweight web component that allows scrollbar to have custom margins, positioning, etc.  
It effectively transforms the scrollbar into a regular HTML element

```jsx
import { ScrollbarClone } from "react-scrollbar-clone";

<ScrollbarClone
    origin-selector=".with-scrollbar-clone"
    disable-scroll="false"
    show-origin-scrollbar="false"
    style="height: 500px;"
/>;
```

## Props

| Prop | Required | Type | Description |
|---|---|---|---|
| `origin-selector` | No | `string` | CSS selector of the element whose scrollbar to clone. Defaults to page (`document.scrollingElement`) |
| `show-origin-scrollbar` | No | `string \| boolean` | Whether to keep the original scrollbar visible. Default: `"true"` |
| `disable-scroll` | No | `string \| boolean` | Disables scroll interaction on the clone. Default: `"false"` |
| `id` | No | `string` | Element id. Auto-generated if omitted |
| `ref` | No | `React.Ref<HTMLElement>` | Ref to the underlying `<scrollbar-clone>` element |

All props are optional. The simplest usage clones the page scrollbar:

```jsx
<ScrollbarClone />
```

Examples:

-   [Page scrollbar demo](https://yakunins.github.io/scrollbar-clone/demo1.html)
-   [Three-column layout demo](https://yakunins.github.io/scrollbar-clone/demo2.html)
