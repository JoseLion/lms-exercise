import { Callout, H1 } from "@blueprintjs/core";
import { ReactElement, StrictMode } from "react";

import { MainErrorBoundary } from "./MainErrorBoundary";

export function App(): ReactElement {

  return (
    <StrictMode>
      <MainErrorBoundary>
        <Callout intent="primary">
          <H1>{"Hello world!"}</H1>
        </Callout>
      </MainErrorBoundary>
    </StrictMode>
  );
}
