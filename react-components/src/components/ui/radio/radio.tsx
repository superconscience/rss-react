import classNames from 'classnames';
import { forwardRef } from 'react';
import { DefaultLabelProps, DefaultRadioProps, UncontrollableRadio, Validatable } from '../common';

export type RadioInputProps = {
  inputProps?: DefaultRadioProps;
  labelProps?: DefaultLabelProps;
  name?: string;
  label: string;
  value: string;
};

export const RadioInput = forwardRef<
  HTMLInputElement,
  RadioInputProps & Validatable & UncontrollableRadio
>(({ label, name, value, inputProps, labelProps, validClassName, checked }, ref) => {
  const id = `radio-${value}`;
  return (
    <>
      <input
        ref={ref}
        type="radio"
        className={classNames(validClassName, inputProps?.className)}
        name={name}
        id={id}
        autoComplete="off"
        value={value}
        defaultChecked={checked}
        {...inputProps}
      />
      <label {...labelProps} htmlFor={id}>
        {label}
      </label>
    </>
  );
});
