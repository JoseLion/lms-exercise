import { NonIdealState } from "@blueprintjs/core";
import { ReactElement } from "react";

export function NotFoundScreen(): ReactElement {

  return (
    <NonIdealState
      icon="rain"
      title="Not found"
      description="The page you're looking for does not exist"
    />
  );
}
