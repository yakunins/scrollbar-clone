import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Welcome",
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
    render: () => <h1>Welcome!</h1>,
    name: "Welcome",
};
