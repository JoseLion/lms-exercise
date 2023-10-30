import { Button, Navbar } from "@blueprintjs/core";
import { ReactElement, useCallback } from "react";
import Cookies from "universal-cookie";

import { useAuth } from "../../store/Auth.context";

export function Topbar(): ReactElement {

  const { session, setAccount, setSession } = useAuth();

  const logout = useCallback((): void => {
    const cookies = new Cookies();
    cookies.remove("Session");
    setSession(undefined);
    setAccount(undefined);
  }, []);

  return (
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading>{"LMS Exercise"}</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>

      {session && (
        <Navbar.Group align="right">
          <Button icon="log-out" onClick={logout}>{"Log out"}</Button>
        </Navbar.Group>
      )}
    </Navbar>
  );
}
