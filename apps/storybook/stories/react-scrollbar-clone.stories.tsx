import type { Meta, StoryObj } from "@storybook/react";
import { ScrollbarClone, Lorem } from "react-scrollbar-clone";

const meta: Meta<typeof ScrollbarClone> = {
    title: "React/react-scrollbar-clone",
};

export default meta;

type Story = StoryObj<typeof ScrollbarClone>;

export const OneCol: Story = {
    render: () => (
        <div className="page">
            <style>
                {`
                    html { --overflow: hidden; }
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
            <div className="fixed-header">global navigation</div>
            <ScrollbarClone
                disable-scroll
                id="test"
                show-origin-scrollbar="false"
                style={{
                    height: "calc(100dvh - var(--header-size))",
                    position: "fixed",
                    top: "var(--header-size)",
                    right: 0,
                }}
            />
            <Lorem />
            <Lorem />
            <Lorem />
            <Lorem />
            <Lorem />
            <Lorem />
        </div>
    ),
    name: "one column",
};
