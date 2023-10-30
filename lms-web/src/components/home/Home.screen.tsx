import { Button, Classes, H2, Overlay } from "@blueprintjs/core";
import { ReactElement, useCallback, useState } from "react";

import { ButtonRow, HomeModal, HomeView, WelcomeCard } from "./Home.styles";
import { Login } from "./login/Login.component";
import { Register } from "./register/Register.component";

export function HomeScreen(): ReactElement {

  const [showPopup, setShowPopup] = useState<"login" | "register">();

  const showLogin = useCallback((): void => {
    setShowPopup("login");
  }, []);

  const showRegister = useCallback((): void => {
    setShowPopup("register");
  }, []);

  const closePopup = useCallback((): void => {
    setShowPopup(undefined);
  }, []);

  return (
    <HomeView>
      <WelcomeCard elevation={2} >
        <H2>{"Welcome!"}</H2>

        <ButtonRow>
          <Button intent="none" large={true} onClick={showLogin}>{"Login"}</Button>
          <Button intent="primary" large={true} onClick={showRegister}>{"Register"}</Button>
        </ButtonRow>
      </WelcomeCard>

      <Overlay isOpen={showPopup !== undefined} onClose={closePopup} canOutsideClickClose={showPopup === "login"}>
        <HomeModal className={Classes.OVERLAY_CONTENT} elevation={4}>
          {showPopup === "login" && <Login onCancel={closePopup} />}
          {showPopup === "register" && <Register onCancel={closePopup} />}
        </HomeModal>
      </Overlay>
    </HomeView>
  );
}
