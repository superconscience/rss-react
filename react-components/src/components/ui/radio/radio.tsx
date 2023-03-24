import { forwardRef } from 'react';
import { getRandomId } from '../../../utils/functions';
import { DefaultLabelProps, DefaultRadioProps } from '../common';

export type RadioInputProps = {
  inputProps?: DefaultRadioProps;
  labelProps?: DefaultLabelProps;
  name: string;
  label: string;
  value: string;
};

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ label, name, value, inputProps, labelProps }, ref) => {
    const id = `radio-${getRandomId()}`;
    return (
      <>
        <input
          ref={ref}
          type="radio"
          {...inputProps}
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
