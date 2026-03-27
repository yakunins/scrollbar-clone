import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollbarClone } from "react-scrollbar-clone";
import { LoremIpsum } from "./lorem-ipsum";

interface StoryArgs {
    "disable-scroll": boolean;
    "show-origin-scrollbar": boolean;
    "html-overflow-hidden": boolean;
}

const meta: Meta<StoryArgs> = {
    title: "React/react-scrollbar-clone",
    argTypes: {
        "disable-scroll": { control: "boolean" },
        "show-origin-scrollbar": { control: "boolean" },
        "html-overflow-hidden": { control: "boolean" },
    },
    args: {
        "disable-scroll": false,
        "show-origin-scrollbar": false,
        "html-overflow-hidden": false,
    },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const OneCol: Story = {
    render: (args) => {
        const overflowHiddenCSS = `html, body { overflow-y: hidden; }`;

        return (
            <div className="page">
                <style>
                    {`
                        .page {
                            --header-size: 54px;
                            margin-top: var(--header-size);
                        }
                        .fixed-header {
                            position: fixed;
                            height: var(--header-size);
                            top: 0;
                            left: 0;
                            width: 100%;
                            background-color: tan;
                        }
                    `}
                </style>
                {args["html-overflow-hidden"] ? (
                    <style>{overflowHiddenCSS}</style>
                ) : null}
                <div className="fixed-header">global navigation</div>
                <ScrollbarClone
                    disable-scroll={
                        args["disable-scroll"] ? "true" : "false"
                    }
                    id="test"
                    show-origin-scrollbar={
                        args["show-origin-scrollbar"] ? "true" : "false"
                    }
                    style={{
                        height: "calc(100dvh - var(--header-size))",
                        position: "fixed",
                        top: "var(--header-size)",
                        right: 0,
                    }}
                />
                <LoremIpsum />
                <LoremIpsum />
                <LoremIpsum />
                <LoremIpsum />
                <LoremIpsum />
                <LoremIpsum />
            </div>
        );
    },
    name: "one column",
};
