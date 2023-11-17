import type { Meta, StoryObj } from "@storybook/react";
import { ScrollbarClone, Lorem } from "react-scrollbar-clone";

const meta: Meta<typeof ScrollbarClone> = {
    title: "React/react-scrollbar-clone",
};

export default meta;

type Story = StoryObj<typeof ScrollbarClone>;

export const Primary: Story = {
    render: () => (
        <>
            <style>
                {`
                    html { overflow: hidden; }
                `}
            </style>
            <ScrollbarClone
                id="test"
                show-origin-scrollbar="false"
                style={{
                    height: "100dvh",
                    position: "fixed",
                    top: 0,
                    right: 0,
                }}
            />
            <Lorem />
            <Lorem />
            <Lorem />
            <Lorem />
            <Lorem />
            <Lorem />
            <Lorem />
        </>
    ),
    name: "one column",
};
