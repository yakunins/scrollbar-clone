import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { ScrollbarClone } from "scrollbar-clone";
import "./lorem-ipsum";
import "scrollbar-clone";

const meta: Meta<typeof ScrollbarClone> = {
    title: "Web Component/scrollbar-clone",
};

export default meta;
type Story = StoryObj<typeof ScrollbarClone>;
export const OneCol: Story = {
    render: () => {
        return <OneColExample />;
    },
    name: "one column",
};

function OneColExample(): React.ReactNode {
    const [disabled, setDisabled] = useState(false);
    const [overflow, setOverflow] = useState(false);

    const oveflowHiddenCSS = `html, body { overflow-y: hidden; }`;

    return (
        <div>
            <div
                className="controls"
                style={{
                    position: "fixed",
                    background: "tan",
                    padding: "1rem",
                    margin: "1rem",
                }}
            >
                <label>
                    <input
                        onChange={() => {
                            setDisabled(!disabled);
                        }}
                        type="checkbox"
                        value={disabled ? "true" : "false"}
                    />
                    disable-scroll
                </label>
                <br />
                <label>
                    <input
                        onChange={() => {
                            setOverflow(!overflow);
                        }}
                        type="checkbox"
                        value={overflow ? "true" : "false"}
                    />
                    html-overflow-hidden
                </label>
            </div>
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
            {overflow ? <style>{oveflowHiddenCSS}</style> : null}
            <scrollbar-clone
                disable-scroll={disabled ? "true" : "false"}
                id="test"
                show-origin-scrollbar="false"
                style={{
                    height: "100dvh",
                    position: "fixed",
                    top: 0,
                    right: 0,
                }}
            />
            {[
                Array(20)
                    .fill("")
                    .map((i, idx) => {
                        return (
                            <p key={idx}>
                                <lorem-ipsum />
                            </p>
                        );
                    }),
            ]}
        </div>
    );
}

export const ThreeCol: Story = {
    render: () => {
        const onRef: React.LegacyRef<HTMLDivElement> = (el) => {
            const handleWheel = (e: Event): void => {
                e.preventDefault();
                e.stopPropagation();
            };
            const handleTouch = (e: Event): void => {
                e.preventDefault();
                e.stopPropagation();
            };
            el?.addEventListener("wheel", handleWheel);
            el?.addEventListener("touchmove", handleTouch);
        };
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
                                {[
                                    Array(5)
                                        .fill("")
                                        .map((i, idx) => (
                                            <p key={idx}>
                                                <lorem-ipsum />
                                            </p>
                                        )),
                                ]}
                            </div>
                            <scrollbar-clone
                                id="scrollbar-left"
                                origin-selector=".panel-left-scrollable"
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    right: 0,
                                    height: "90%",
                                    outline: "1px solid red",
                                }}
                            />
                        </div>
                    </div>
                    <div className="panel-center">
                        <scrollbar-clone
                            id="scrollbar-center"
                            style={{
                                height: "calc(100dvh - var(--header-height))",
                                position: "fixed",
                                top: "var(--header-height)",
                                right: "var(--panel-left-width)",
                            }}
                        />
                        {[
                            Array(20)
                                .fill("")
                                .map((i, idx) => (
                                    <p key={idx}>
                                        <lorem-ipsum />
                                    </p>
                                )),
                        ]}
                    </div>
                    <div className="panel-right-placeholder">
                        <div className="panel-right containing-block">
                            <div className="panel-right-scrollable">
                                {[
                                    Array(5)
                                        .fill("")
                                        .map((i, idx) => (
                                            <p key={idx}>
                                                <lorem-ipsum />
                                            </p>
                                        )),
                                ]}
                            </div>
                            <scrollbar-clone
                                id="scrollbar-right"
                                origin-selector=".panel-right-scrollable"
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
                            top: 10vmin;
                            left: 10vmin;
                            background: #fff;
                            box-shadow: 0 0 10px rgba(127,127,127,.5);
                            border-radius: .5rem;
                            padding: 1rem 2rem;
                            z-index: 100;
                        }
                    `}
                    </style>
                    <div className="portal prevent-scroll" ref={onRef}>
                        <div>portal 1 content (prevent-scroll)</div>
                    </div>
                    <div className="portal" style={{ top: "25vmin" }}>
                        <div>portal 2 content</div>
                    </div>
                </div>
            </div>
        );
    },
    name: "three column",
};
