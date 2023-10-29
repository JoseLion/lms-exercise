import { render } from "@testing-library/react";

import { App } from "../../src/App";

describe("[Integration] App.test.tsx", () => {
  context("when the app loads", () => {
    it("renders the initial screen", () => {
      const { getByRole } = render(<App />);

      getByRole("heading", { level: 1, name: "Hello world!" });
    });
  });
});
