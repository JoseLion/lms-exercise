import { Button, H3 } from "@blueprintjs/core";
import { Form } from "@lynxts/web";
import { DateTime } from "luxon";
import { ReactElement, useCallback, useState } from "react";
import { finalize } from "rxjs";
import { ObjectSchema, date, object, string } from "yup";

import { StudentService } from "../../../services/student.service";
import { DateField } from "../../common/fields/Date.field";
import { TextField } from "../../common/fields/Text.field";

interface RegisterProps {
  onCancel: () => void;
}

interface Student {
  address: string;
  birthdate: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

const minAge = DateTime.now().startOf("day").minus({ years: 16 }).toJSDate();
const ageMessage = "students shall be at least 16 years old";

const schema: ObjectSchema<Student> = object({
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

  const register = useCallback((values: Student): void => {
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
        <TextField<Student> type="email" name="email" label="Email" />
        <TextField<Student> type="password" name="password" label="Password" />
        <TextField<Student> name="firstName" label="First name" />
        <TextField<Student> name="lastName" label="Last name" />
        <DateField<Student> name="birthdate" label="Birthdate" />
        <TextField<Student> name="address" label="Address" />
        <TextField<Student> name="phoneNumber" label="Phone number" />

        <Button type="button" onClick={onCancel}>{"Cancel"}</Button>
        <Button type="submit" intent="primary" loading={pending}>{"Register"}</Button>
      </Form>
    </>
  );
}
