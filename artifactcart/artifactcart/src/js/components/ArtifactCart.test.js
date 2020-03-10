import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ArtifactCart from "./ArtifactCart";

let container = null;
beforeEach(() => {
    // Create a fresh container each test
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // Cleanup after each test
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Adds items to the cart", () => {
    act(() => {
        render(<ArtifactCart />, container);
    });

    expect(container.textContent).not.toContain("Sample Item 1");

    let button = document.querySelector("[data-additem=button]");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain("Sample Item 1");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain("Sample Item 2");
});

it("Updates the cart total", () => {
    act(() => {
        render(<ArtifactCart />, container);
    });

    expect(container.textContent).toContain("Total Items: 0");

    let button = document.querySelector("[data-additem=button]");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain("Total Items: 1");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain("Total Items: 2");
});
