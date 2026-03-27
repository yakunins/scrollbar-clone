import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoremIpsum } from "./lorem-ipsum";

import "scrollbar-clone";

interface StoryArgs {
    "disable-scroll": boolean;
    "show-origin-scrollbar": boolean;
    "html-overflow-hidden": boolean;
    "animate-scrollbar": boolean;
}

const meta: Meta<StoryArgs> = {
    title: "Web Component/scrollbar-clone",
    argTypes: {
        "disable-scroll": { control: "boolean" },
        "show-origin-scrollbar": { control: "boolean" },
        "html-overflow-hidden": { control: "boolean" },
        "animate-scrollbar": { control: "boolean" },
    },
    args: {
        "disable-scroll": false,
        "show-origin-scrollbar": false,
        "html-overflow-hidden": false,
        "animate-scrollbar": false,
    },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const OneCol: Story = {
    render: (args) => {
        const overflowHiddenCSS = `html, body { overflow-y: hidden; }`;

        return (
            <div>
                <style>
                    {`
                    _scrollbar-clone {
                        opacity: 0;
                        transition-property: opacity;
                        transition-duration: .35s;
                        transition-delay: .15s;
                    }
                    _scrollbar-clone:hover,
                    _scrollbar-clone[data-scrolling] {
                        opacity: 1;
                        transition-duration: .0s;
                        transition-delay: 0s;
                    }
                `}
                </style>
                {args["html-overflow-hidden"] ? (
                    <style>{overflowHiddenCSS}</style>
                ) : null}
                <scrollbar-clone
                    disable-scroll={args["disable-scroll"] ? "true" : "false"}
                    id="test"
                    show-origin-scrollbar={
                        args["show-origin-scrollbar"] ? "true" : "false"
                    }
                    style={{
                        height: "100dvh",
                        position: "fixed",
                        top: 0,
                        right: 0,
                    }}
                />
                {Array(20)
                    .fill("")
                    .map((_, idx) => (
                        <LoremIpsum key={idx} />
                    ))}
            </div>
        );
    },
    name: "one column",
};

export const ThreeCol: Story = {
    render: (args) => {
        const preventScroll: React.Ref<HTMLElement> = (el) => {
            const preventDefaultHandle = (e: Event): void => {
                e.preventDefault();
                e.stopPropagation();
            };
            if (el) {
                el.addEventListener("wheel", preventDefaultHandle);
                el.addEventListener("touchmove", preventDefaultHandle);
                return () => {
                    el.removeEventListener("wheel", preventDefaultHandle);
                    el.removeEventListener("touchmove", preventDefaultHandle);
                };
            }
        };

        const overflowHiddenCSS = `html, body { overflow-y: hidden; }`;
        const disableScroll = args["disable-scroll"] ? "true" : "false";
        const showOriginScrollbar = args["show-origin-scrollbar"]
            ? "true"
            : "false";

        return (
            <div className="page">
                <style>
                    {`
                        .page {
                            --header-height: 54px;
                            --panel-left-width: 200px;
                            --panel-right-width: 200px;
                            margin-top: var(--header-height);
                        }
                        .fixed-header {
                            position: fixed;
                            height: var(--header-height);
                            top: 0;
                            left: 0;
                            width: 100%;
                            background-color: tan;
                            z-index: 1;
                        }
                    `}
                </style>
                {args["html-overflow-hidden"] ? (
                    <style>{overflowHiddenCSS}</style>
                ) : null}
                <header className="fixed-header">global navigation</header>
                <section className="panels">
                    <style>
                        {`
                            .panels {
                                display: grid;
                                grid-template-columns:
                                    var(--panel-left-width)
                                    1fr
                                    var(--panel-right-width);
                            }
                            .panels > * {}
                            .panel-center {}
                            .panel-left-placeholder { flex: 0 0 var(--panel-left-width); }
                            .panel-right-placeholder { flex: 0 0 var(--panel-right-width); }

                            .panel-left,
                            .panel-right {
                                position: fixed;
                                top: var(--header-height);
                                height: calc(100dvh - var(--header-height));
                            }
                            .panel-left {
                                width: var(--panel-left-width);
                                --background: red;
                            }
                            .panel-right {
                                width: var(--panel-right-width);
                                --background: blue;
                            }
                            .containing-block { will-change: transform; }
                            .panel-left-scrollable,
                            .panel-right-scrollable {
                                width: 100%;
                                height: 100%;
                                overflow-y: scroll;
                            }
                            scrollbar-clone {
                                --opacity: 0;
                                transition-property: opacity;
                                transition-duration: .35s;
                                transition-delay: .15s;

                                &:hover,
                                &[data-scrolling] {
                                    opacity: 1;
                                    transition-duration: .0s;
                                    transition-delay: 0s;
                                }
                            }
                            .panel-left:hover #scrollbar-left,
                            .panel-center:hover #scrollbar-center,
                            .panel-right:hover #scrollbar-right {
                                opacity: 1;
                            }
                            scrollbar-clone {
                                --thumb-bg: rgba(127,127,127, .5);

                                &[data-ua*="device_type_unknown"] {
                                    ::-webkit-scrollbar {
                                        background-image: none;
                                    }
                                    ::-webkit-scrollbar-thumb {
                                        background-color: var(--thumb-bg);
                                    }
                                    ::-webkit-scrollbar-track {
                                        background-color: transparent;
                                    }
                                    &[data-ua*="firefox"] * {
                                        scrollbar-color: var(--thumb-bg) transparent;
                                        scrollbar-width: thin;
                                    }
                                }
                            }
                            *:focus { background-color: red !important; }
                            *:focus-within { background-color: blue !important; }
                        `}
                    </style>
                    <div className="panel-left-placeholder">
                        <div className="panel-left containing-block">
                            <div className="panel-left-scrollable">
                                {Array(5)
                                    .fill("")
                                    .map((_, idx) => (
                                        <LoremIpsum key={idx} />
                                    ))}
                            </div>
                            <scrollbar-clone
                                id="scrollbar-left"
                                origin-selector=".panel-left-scrollable"
                                disable-scroll={disableScroll}
                                show-origin-scrollbar={showOriginScrollbar}
                                style={{
                                    position: "fixed",
                                    top: "10%",
                                    right: "0",
                                    height: "80%",
                                    outline: "1px solid red",
                                }}
                            />
                        </div>
                    </div>
                    <div className="panel-center">
                        <scrollbar-clone
                            id="scrollbar-center"
                            disable-scroll={disableScroll}
                            show-origin-scrollbar={showOriginScrollbar}
                            style={{
                                height: "calc(100dvh - var(--header-height))",
                                position: "fixed",
                                top: "var(--header-height)",
                                right: "var(--panel-left-width)",
                            }}
                        />
                        {Array(20)
                            .fill("")
                            .map((_, idx) => (
                                <LoremIpsum key={idx} />
                            ))}
                    </div>
                    <div className="panel-right-placeholder">
                        <div className="panel-right containing-block">
                            <div className="panel-right-scrollable">
                                {Array(5)
                                    .fill("")
                                    .map((_, idx) => (
                                        <LoremIpsum key={idx} />
                                    ))}
                            </div>
                            <scrollbar-clone
                                id="scrollbar-right"
                                origin-selector=".panel-right-scrollable"
                                disable-scroll={disableScroll}
                                show-origin-scrollbar={showOriginScrollbar}
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    right: 0,
                                    height: "100%",
                                }}
                            />
                        </div>
                    </div>
                </section>
                <div className="portal-root">
                    <style>
                        {`
                        .portal {
                            position: fixed;
                            top: 10vmax;
                            left: 5vmax;
                            background: #fff;
                            box-shadow: 0 0 10px rgba(127,127,127,.5);
                            border-radius: .5rem;
                            padding: 1rem 2rem;
                            z-index: 100;
                        }
                    `}
                    </style>
                    <div className="portal" ref={preventScroll}>
                        <div>portal#1 with prevent-scroll</div>
                    </div>
                    <div className="portal" style={{ top: "15vmax" }}>
                        <div>portal#2 content</div>
                    </div>
                </div>
            </div>
        );
    },
    name: "three column",
};

const positionDemoCSS = `
    body.position-demo {
        --fill-color: navy;
        --noise: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.616' numOctaves='1' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E");
        --memphis: url("data:image/svg+xml,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='70' height='70' fill='transparent' patternTransform='scale(5) rotate(55)'><rect x='0' y='0' width='100%' height='100%' /><path d='M-4.8 4.44L4 16.59 16.14 7.8M32 30.54l-13.23 7.07 7.06 13.23M-9 38.04l-3.81 14.5 14.5 3.81M65.22 4.44L74 16.59 86.15 7.8M61 38.04l-3.81 14.5 14.5 3.81' stroke-linejoin='round' stroke-linecap='round' stroke-width='0.25' stroke='salmon' fill='none'/><path d='M59.71 62.88v3h3M4.84 25.54L2.87 27.8l2.26 1.97m7.65 16.4l-2.21-2.03-2.03 2.21m29.26 7.13l.56 2.95 2.95-.55' stroke-linejoin='round' stroke-linecap='round' stroke-width='0.35' stroke='rebeccapurple' fill='none'/><path d='M58.98 27.57l-2.35-10.74-10.75 2.36M31.98-4.87l2.74 10.65 10.65-2.73M31.98 65.13l2.74 10.66 10.65-2.74' stroke-linejoin='round' stroke-linecap='round' stroke-width='0.25' stroke='gold' fill='none'/><path d='M8.42 62.57l6.4 2.82 2.82-6.41m33.13-15.24l-4.86-5.03-5.03 4.86m-14-19.64l4.84-5.06-5.06-4.84' stroke-linejoin='round' stroke-linecap='round' stroke-width='0.25' stroke='%2300bdd6' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-470,-220)' fill='url(%23a)'/></svg>");

        font-family: Consolas, mono;
        letter-spacing: -0.025em;
        line-height: 1.35;
        margin: 0;
    }

    .pos-demo .scroll-window,
    .pos-demo .bg {
        background-color: var(--fill-color);
        background-image: var(--memphis);
    }

    .pos-demo {
        --w: clamp(25em, 50dvw, 35em);
        --h: clamp(25em, 90dvh, 35em);
        --x: calc((100dvw - var(--w)) / 2);
        --y: calc((100dvh - var(--h)) / 2);
    }

    .pos-demo .bg {
        position: fixed;
        width: 100dvw;
        height: 100dvh;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .pos-demo .scroll-window {
        --grad-size: 15dvh;
        --g-y1: calc(var(--y) - var(--grad-size));
        --g-y2: var(--y);
        --g-y3: calc(100dvh - var(--y));
        --g-y4: calc(var(--g-y3) + var(--grad-size));
        --g-y5: calc(var(--g-y3) + var(--grad-size));
        --g-x1: var(--x);
        --g-x2: calc(100dvw - var(--x));

        content: "";
        position: fixed;
        width: 100dvw;
        height: 100dvh;
        top: 0;
        left: 0;
        padding: var(--y) var(--x);
        pointer-events: none;
        box-sizing: border-box;

        mask-image:
            linear-gradient(
                0deg,
                black 0%, black var(--g-y1),
                transparent var(--g-y2), transparent var(--g-y3),
                black var(--g-y4), black var(--g-y5)
            ),
            linear-gradient(
                90deg,
                black 0%, black var(--g-x1),
                transparent var(--g-x1), transparent var(--g-x2),
                black var(--g-x2)
            );
    }

    .pos-demo .article {
        background: rgba(255, 255, 255, 0.8);
        padding: 3em 2em;
        margin: var(--y) var(--x);
        z-index: 2;
    }

    .pos-demo .article b {
        font-family: Calibri, Roboto, sans-serif;
        letter-spacing: -0.15em;
        font-weight: 400;
        white-space: nowrap;
    }

    .pos-demo scrollbar-clone {
        position: fixed;
        height: var(--h);
        top: var(--y);
        right: calc(var(--x) + 0.02px);
        z-index: 1;
    }

    .pos-demo a, .pos-demo u {
        text-decoration-thickness: 0.075em !important;
        text-underline-offset: 0.1em;
        color: black;
        text-decoration: underline;
    }
    .pos-demo a sup {
        margin: 0 0.25em;
        font-size: 80%;
        font-weight: normal;
    }
    .pos-demo h1 a, .pos-demo b {
        text-decoration: none;
    }

    @property --deg {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    .pos-demo .animated {
        --radius-x: 2em;
        --radius-y: 2em;
        --sy: sin(var(--deg));
        --sx: cos(var(--deg));
        --dy: calc(var(--radius-y) * var(--sy));
        --dx: calc(var(--radius-x) * var(--sx));

        animation: 5s pos-rotate infinite;
        animation-timing-function: linear;
        transform: translate(var(--dx), var(--dy));
    }

    @keyframes pos-rotate {
        0%   { --deg: 0deg; }
        50%  { --deg: 180deg; }
        100% { --deg: 360deg; }
    }

    @media print {
        .pos-demo scrollbar-clone,
        .pos-demo .scroll-window,
        .pos-demo .bg {
            display: none;
        }
        .pos-demo {
            --w: auto;
            --h: auto;
        }
    }
`;

export const Position: Story = {
    render: (args) => {
        const overflowHiddenCSS = `html, body { overflow-y: hidden; }`;
        const disableScroll = args["disable-scroll"] ? "true" : "false";
        const showOriginScrollbar = args["show-origin-scrollbar"]
            ? "true"
            : "false";

        React.useEffect(() => {
            document.body.classList.add("position-demo");
            return () => {
                document.body.classList.remove("position-demo");
            };
        }, []);

        return (
            <div className="pos-demo">
                <style>{positionDemoCSS}</style>
                {args["html-overflow-hidden"] ? (
                    <style>{overflowHiddenCSS}</style>
                ) : null}
                <div className="bg" />
                <scrollbar-clone
                    id="article"
                    disable-scroll={disableScroll}
                    show-origin-scrollbar={showOriginScrollbar}
                    {...{
                        class: args["animate-scrollbar"]
                            ? "animated"
                            : undefined,
                    }}
                />
                <div className="article">
                    <h1>
                        <a
                            href="https://www.npmjs.com/package/scrollbar-clone"
                            target="_blank"
                        >
                            <u>Scrollbar Clone</u>
                            <sup>&uarr;</sup>
                        </a>
                    </h1>
                    <p>Transforms scrollbar into a regular HTML element.</p>
                    <p style={{ color: "red" }}>
                        Scrollbar of html element is here&nbsp;<b>&mdash;&rarr;</b>
                        <br />
                        <b>&larr;&mdash;</b>&nbsp;Scroll to work even on these
                        surroundings
                    </p>
                    {Array(5)
                        .fill("")
                        .map((_, idx) => (
                            <LoremIpsum key={idx} />
                        ))}
                </div>
                <div className="scroll-window" />
            </div>
        );
    },
    args: {
        "animate-scrollbar": true,
    },
    name: "scrollbar position",
};
