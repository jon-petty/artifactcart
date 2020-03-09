import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ArtifactCart from "./ArtifactCart";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders Hello World", () => {
  act(() => {
    render(<ArtifactCart />, container);
  });
  expect(container.textContent).toBe("Hello World");
});
