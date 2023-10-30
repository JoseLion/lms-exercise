import { FormGroup, NumericInput, NumericInputProps } from "@blueprintjs/core";
import { Optional, Path, Struct, useField, useFieldValidation } from "@lynxts/core";
import { ReactElement, useCallback, useEffect, useState } from "react";

export interface NumericFieldProps<
  T extends Struct,
> extends Omit<NumericInputProps, "onValueChange" | "value"> {
  label?: string;
  name: Path<T, number>;
  onChange?: (value: Optional<number>) => void;
}

export function NumericField<T extends Struct>(props: NumericFieldProps<T>): ReactElement {
  const { label, name, onChange, ...rest } = props;

  const { setTouched, setValue, value } = useField(name);
  const { error, required } = useFieldValidation(name);

  const [display, setDisplay] = useState(value?.toString() ?? "");

  const handleChange = useCallback((valueAsNumber: number, valueAsString: string): void => {
    setValue(valueAsNumber);
    setDisplay(valueAsString);
    onChange?.(valueAsNumber);
  }, [onChange]);

  useEffect(() => {
    setDisplay(value?.toString() ?? "");
    onChange?.(value);
  }, [value]);

  return (
    <FormGroup
      label={label}
      labelInfo={required ? "*" : ""}
      helperText={error}
      intent={error ? "danger" : "none"}
    >
      <NumericInput
        buttonPosition="left"
        {...rest}
        id={name}
        name={name}
        minorStepSize={0.001}
        onValueChange={handleChange}
        onBlur={setTouched}
        value={display ?? value}
      />
    </FormGroup>
  );
}
