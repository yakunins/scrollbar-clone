/* eslint-disable @typescript-eslint/no-namespace */
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollbarClone, LoremIpsum, defineElement } from "scrollbar-clone";

defineElement("scrollbar-clone", ScrollbarClone);
defineElement("lorem-ipsum", LoremIpsum);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "scrollbar-clone": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            "lorem-ipsum": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

const meta: Meta<typeof ScrollbarClone> = {
    title: "Web Component/scrollbar-clone",
};

export default meta;

type Story = StoryObj<typeof ScrollbarClone>;

export const OneCol: Story = {
    render: () => {
        return (
            <div>
                <style>
                    {`
                        scrollbar-clone {
                            opacity: 0;
                            transition-property: opacity;
                            transition-duration: .35s;
                            transition-delay: .15s;
                        }
                        scrollbar-clone:hover,
                        scrollbar-clone[data-scrolling] {
                            opacity: 1;
                            transition-duration: .0s;
                            transition-delay: 0s;
                        }
                    `}
                </style>
                <scrollbar-clone
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
    },
    name: "one column",
};

export const ThreeCol: Story = {
    render: () => {
        return (
            <div>
                <style>
                    {`
                        scrollbar-clone {
                            opacity: 0;
                            transition-property: opacity;
                            transition-duration: .35s;
                            transition-delay: .15s;
                        }
                        scrollbar-clone:hover,
                        scrollbar-clone[data-scrolling] {
                            opacity: 1;
                            transition-duration: .0s;
                            transition-delay: 0s;
                        }
                    `}
                </style>
                <scrollbar-clone
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
    },
    name: "three column",
};
