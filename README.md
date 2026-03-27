# Scrollbar Clone

<img src="images/how-it-work-scrollbar-1.gif" width="700" alt="how it work: transforms the scrollbar into a regular HTML element" />

[![npm version](https://img.shields.io/npm/v/scrollbar-clone.svg)](https://www.npmjs.com/package/scrollbar-clone)

Lightweight web component that allows scrollbar to have custom margins, positioning, etc.
It effectively transforms the scrollbar into a regular HTML element.
Built with [Lit](https://lit.dev/) for reactive properties and composable controllers.

```html
<scrollbar-clone
    origin-selector=".with-scrollbar-clone"
    disable-scroll="false"
    show-origin-scrollbar="false"
    style="height: 500px;"
/>
```

Examples:

- [Page scrollbar](https://yakunins.github.io/scrollbar-clone/demo1.html) — replace the native page scrollbar
- [Multi-panel layout](https://yakunins.github.io/scrollbar-clone/demo2.html) — three independent scrollbar clones
- [Scrollbar position](https://yakunins.github.io/scrollbar-clone/demo3.html) — custom position with CSS animation

Try it in → [CodeSandbox, scrollbar position example](https://codesandbox.io/p/sandbox/m5mjh4)

## Project structure

```
packages/
├── scrollbar-clone/          # Web component (npm: scrollbar-clone)
├── react-scrollbar-clone/    # React wrapper (npm: react-scrollbar-clone)
└── config/
    ├── eslint/               # Shared ESLint configs
    └── tsconfig/             # Shared TypeScript configs

apps/
└── storybook/                # Storybook dev environment & demos

docs/                         # GitHub Pages demos
```

- **`packages/scrollbar-clone/`** — core web component built with Lit, depends on `lit` and `ua-parser-js`
- **`packages/react-scrollbar-clone/`** — React wrapper using [`@lit/react`](https://www.npmjs.com/package/@lit/react)
- **`packages/config/`** — internal shared tooling configs (not published)
