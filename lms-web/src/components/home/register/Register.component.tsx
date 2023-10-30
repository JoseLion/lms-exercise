import { Button, H3 } from "@blueprintjs/core";
import { Form } from "@lynxts/web";
import { DateTime } from "luxon";
import { ReactElement, useCallback, useState } from "react";
import { finalize } from "rxjs";
import { ObjectSchema, date, object, string } from "yup";

import { StudentBody, StudentService } from "../../../services/student.service";
import { DateField } from "../../common/fields/Date.field";
import { TextField } from "../../common/fields/Text.field";

interface RegisterProps {
  onCancel: () => void;
}

const minAge = DateTime.now().startOf("day").minus({ years: 16 }).toJSDate();
const ageMessage = "students shall be at least 16 years old";

const schema: ObjectSchema<StudentBody> = object({
  address: string().required(),
  birthdate: date().max(minAge, ageMessage).required(),
  email: string().email().required(),
  firstName: string().required(),
  lastName: string().required(),
  password: string().required(),
  phoneNumber: string().required(),
});

export function Register({ onCancel }: RegisterProps): ReactElement {

  const [pending, setPending] = useState(false);

  const register = useCallback((values: StudentBody): void => {
    setPending(true);

    StudentService.register(values)
      .pipe(finalize(() => setPending(false)))
      .subscribe(() => {
        alert("Registration successful!");
        onCancel();
      });
  }, [onCancel]);

  return (
    <>
      <H3>{"Welcome aboard!"}</H3>
      <p>{"Fill the form to get started"}</p>

      <Form onSubmit={register} validation={schema}>
        <TextField<StudentBody> type="email" name="email" label="Email" />
        <TextField<StudentBody> type="password" name="password" label="Password" />
        <TextField<StudentBody> name="firstName" label="First name" />
        <TextField<StudentBody> name="lastName" label="Last name" />
        <DateField<StudentBody> name="birthdate" label="Birthdate" />
        <TextField<StudentBody> name="address" label="Address" />
        <TextField<StudentBody> name="phoneNumber" label="Phone number" />

        <Button type="button" onClick={onCancel}>{"Cancel"}</Button>
        <Button type="submit" intent="primary" loading={pending}>{"Register"}</Button>
      </Form>
    </>
  );
}
