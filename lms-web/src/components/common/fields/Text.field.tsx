import { FormGroup, InputGroup, InputGroupProps } from "@blueprintjs/core";
import { Optional, Path, Struct, useField, useFieldValidation } from "@lynxts/core";
import { ChangeEvent, ReactElement, useCallback } from "react";

export type TextInputType =
  | "email"
  | "hidden"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url"
  | "color";

type RestInputProps = Omit<InputGroupProps, "name" | "onChange" | "value">;

export interface TextFieldProps<T extends Struct> extends RestInputProps {
  label?: string;
  name: Path<T, string>;
  normalize?: (value: string) => string;
  onChange?: (text: Optional<string>) => void;
  type?: TextInputType;
}

export function TextField<T extends Struct>(props: TextFieldProps<T>): ReactElement {
  const { label, name, normalize, onChange, type, ...rest } = props;

  const { setTouched, setValue, value } = useField(name);
  const { error, required } = useFieldValidation(name);

  const handleChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
    const next = target.value;
    const normalized = normalize !== undefined
      ? normalize(next)
      : next;

    setValue(normalized);
    onChange?.(normalized);
  }, []);

  return (
    <FormGroup
      label={label}
      labelInfo={required ? "*" : ""}
      helperText={error}
      intent={error ? "danger" : "none"}
    >
      <InputGroup
        {...rest}
        id={name}
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={setTouched}
        value={value ?? ""}
      />
    </FormGroup>
  );
}
