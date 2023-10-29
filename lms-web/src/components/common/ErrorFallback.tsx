import { NonIdealState } from "@blueprintjs/core";
import { ReactElement } from "react";

export function ErrorFallback(): ReactElement {

  return (
    <NonIdealState
      icon="warning-sign"
      title="Oops! Something went wrong..."
      description="Reload the page to try again"
    />
  );
}
