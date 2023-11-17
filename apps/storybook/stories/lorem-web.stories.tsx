/* eslint-disable @typescript-eslint/no-namespace */
import type { Meta, StoryObj } from "@storybook/react";
import { LoremIpsum, defineElement } from "scrollbar-clone";

defineElement("lorem-ipsum", LoremIpsum);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lorem-ipsum": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

const meta: Meta<typeof LoremIpsum> = {
    title: "Web Component/lorem-ipsum",
};

export default meta;

type Story = StoryObj<typeof LoremIpsum>;

export const Primary: Story = {
    render: () => (
        <div>
            <p>
                <lorem-ipsum>Test.</lorem-ipsum>
            </p>
            <p>
                <lorem-ipsum />
            </p>
        </div>
    ),
    name: "<lorem-ipsum />",
};
