import type { Meta, StoryObj } from "@storybook/react";
import { Lorem } from "react-scrollbar-clone";

const meta: Meta<typeof Lorem> = {
    title: "React/Lorem",
    argTypes: {
        children: {
            control: { type: "radio" },
            options: [null, "Hello world!"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Lorem>;

export const Primary: Story = {
    render: ({ children }) => (
        <>
            <Lorem>{children}</Lorem>
            <Lorem />
        </>
    ),
    name: "<Lorem />",
    args: {
        children: null,
    },
};
