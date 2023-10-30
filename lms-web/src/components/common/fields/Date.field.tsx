import { FormGroup, Intent } from "@blueprintjs/core";
import { DateInput3, DateInput3Props } from "@blueprintjs/datetime2";
import { Optional, Path, Struct, useField, useFieldValidation } from "@lynxts/core";
import { DateTime } from "luxon";
import { ReactElement, useCallback, useMemo } from "react";

type RestDateInputProps = Omit<DateInput3Props, "formatDate" | "onChange" | "parseDate" | "value">;

export interface DateFieldProps<T extends Struct> extends RestDateInputProps {
  label?: string;
  name: Path<T, Date>;
  onChange?: (date: Optional<Date>) => void;
}

export function DateField<T extends Struct>(props: DateFieldProps<T>): ReactElement {
  const { label, name, onChange, placeholder, ...rest } = props;

  const { setTouched, setValue, value } = useField(name);
  const { error, required } = useFieldValidation(name);

  const intent = useMemo((): Intent => {
    return error ? "danger" : "none";
  }, [error]);

  const hasTime = useMemo((): boolean => {
    return !!rest.timePickerProps || !!rest.timePrecision;
  }, [rest.timePickerProps, rest.timePrecision]);

  const dateFormat = useMemo((): string => {
    const { timePickerProps, timePrecision } = rest;
    const mm = (timePickerProps?.precision ?? timePrecision) === "minute" ? ":mm" : "";
    const ss = (timePickerProps?.precision ?? timePrecision) === "second" ? ":mm:ss" : "";
    const SSS = (timePickerProps?.precision ?? timePrecision) === "millisecond" ? ":mm:ss.SSS" : "";

    return hasTime
      ? `yyyy-MM-dd HH${mm}${ss}${SSS}`
      : "yyyy-MM-dd";
  }, [hasTime, rest.timePrecision]);

  const dateFormatter = useCallback((date: Date): string => {
    const dateTime = DateTime.fromJSDate(date);

    return hasTime
      ? dateTime.toFormat(dateFormat)
      : dateTime.startOf("day").toFormat(dateFormat);
  }, [hasTime, dateFormat]);

  const dateParser = useCallback((str: string, locale?: string): Nullable<Date | false> => {
    const dateTime = DateTime.fromFormat(str, dateFormat, { locale });

    return dateTime.isValid
      ? dateTime.toJSDate()
      : false;
  }, [dateFormat]);

  const handleChange = useCallback((newDate: Nullable<string>): void => {
    const next = newDate !== null
      ? dateParser(newDate) || undefined
      : undefined;

    setValue(next);
    onChange?.(next);
  }, [dateParser, onChange]);

  const inputProps = useMemo((): DateInput3Props["inputProps"] => ({
    id: name,
    intent,
    name,
    placeholder: placeholder ?? dateFormat,
  }), [name, intent, placeholder, dateFormat]);

  const popoverProps = useMemo((): DateInput3Props["popoverProps"] => ({
    captureDismiss: true,
    onClose: setTouched,
    placement: "bottom",
  }), []);

  return (
    <FormGroup
      label={label}
      labelInfo={required ? "*" : ""}
      helperText={error}
      intent={intent}
    >
      <DateInput3
        minDate={DateTime.now().minus({ years: 100 }).toJSDate()}
        maxDate={DateTime.now().plus({ years: 2 }).toJSDate()}
        {...rest}
        formatDate={dateFormatter}
        parseDate={dateParser}
        onChange={handleChange}
        highlightCurrentDay={true}
        inputProps={inputProps}
        popoverProps={popoverProps}
        value={value?.toISOString()}
      />
    </FormGroup>
  );
}
