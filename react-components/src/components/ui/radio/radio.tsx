import { DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';
import { OmitOnly } from '../../../types/utils';
import { getRandomId } from '../../../utils/functions';

export type RadioInputProps = {
  inputProps?: OmitOnly<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'id' | 'name' | 'type' | 'value'
  >;
  labelProps?: OmitOnly<
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    'htmlFor'
  >;
  name: string;
  label: string;
  value: string;
};

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ label, name, value, inputProps, labelProps }, ref) => {
    const id = `radioInput-${getRandomId()}`;
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
