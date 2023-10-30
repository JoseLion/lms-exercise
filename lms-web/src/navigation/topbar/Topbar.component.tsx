import { Navbar } from "@blueprintjs/core";
import { ReactElement } from "react";

export function Topbar(): ReactElement {

  return (
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading>{"LMS Exercise"}</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
    </Navbar>
  );
}
