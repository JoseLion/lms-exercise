import { Button, H3 } from "@blueprintjs/core";
import { Form } from "@lynxts/web";
import { ReactElement, useCallback, useState } from "react";
import { finalize } from "rxjs";
import Cookies from "universal-cookie";
import { ObjectSchema, object, string } from "yup";

import { AuthService, LoginBody } from "../../../services/auth.service";
import { useAuth } from "../../../store/Auth.context";
import { TextField } from "../../common/fields/Text.field";

interface LoginProps {
  onCancel: () => void;
}

const schema: ObjectSchema<LoginBody> = object({
  email: string().email().required(),
  password: string().required(),
});

export function Login({ onCancel }: LoginProps): ReactElement {

  const { setSession } = useAuth();

  const [pending, setPending] = useState(false);

  const login = useCallback((values: LoginBody): void => {
    setPending(true);

    AuthService
      .login(values)
      .pipe(finalize(() => setPending(false)))
      .subscribe(session => {
        const cookies = new Cookies();
        cookies.set("Session", session);
        setSession(session);
      });
  }, []);

  return (
    <>
      <H3>{"Welcome back!"}</H3>
      <p>{"Use you credential to log in"}</p>

      <Form onSubmit={login} validation={schema}>
        <TextField<LoginBody> name="email" type="email" label="Email" />
        <TextField<LoginBody> name="password" type="password" label="Password" />

        <Button type="button" onClick={onCancel}>{"Cancel"}</Button>
        <Button type="submit" intent="primary" loading={pending}>{"Log in"}</Button>
      </Form>
    </>
  );
}
