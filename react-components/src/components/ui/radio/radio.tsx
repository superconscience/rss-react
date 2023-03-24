import { forwardRef } from 'react';
import { getRandomId } from '../../../utils/functions';
import { DefaultLabelProps, DefaultRadioProps, Validatable } from '../common';
import classNames from 'classnames';

export type RadioInputProps = {
  inputProps?: DefaultRadioProps;
  labelProps?: DefaultLabelProps;
  name: string;
  label: string;
  value: string;
};

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps & Validatable>(
  ({ label, name, value, inputProps, labelProps, validClassName }, ref) => {
    const id = `radio-${getRandomId()}`;
    return (
      <>
        <input
          ref={ref}
          type="radio"
          {...inputProps}
          className={classNames(validClassName, inputProps?.className)}
          name={name}
          id={id}
          autoComplete="off"
          value={value}
        />
        <label {...labelProps} htmlFor={id}>
          {label}
        </label>
      </>
    );
  }
);
