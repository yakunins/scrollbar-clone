import { test, expect } from "@playwright/test";

const testground = `
<button onclick="handleClick()">btn</button>
<div data-testid="div" id="div">abc</div>
<script type="module">
    import { scrollbarThickness } from "./index.mjs";

    async function handleClick() {
        const div = document.querySelector('#div');
        const { x, y } = scrollbarThickness(div);
        div.textContent = \`$\{x},$\{y}\`;
    }
    globalThis.handleClick = handleClick;
</script>
`;

test("get started link", async ({ page }) => {
    await page.goto("/");

    const h1 = page.getByTestId("h1");
    expect(await h1.textContent()).toBe("playwright test page");

    await page.setContent(testground);

    const div = page.getByTestId("div");

    await page.click("button");
    expect(await div.textContent()).toBe("17,17");
    // await page.screenshot({ path: "screenshot.png" });
});
