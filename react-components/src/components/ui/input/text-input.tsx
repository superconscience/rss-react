import cn from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';
import { OmitOnly } from '../../../types/utils';
import { getRandomId } from '../../../utils/functions';

export type TextInputProps = {
  inputProps?: OmitOnly<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'id' | 'name'
  >;
  labelProps?: OmitOnly<
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    'htmlFor'
  >;
  name: string;
  label: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, inputProps, labelProps }, ref) => {
    const id = `textInput-${getRandomId()}`;
    return (
      <>
        <label {...labelProps} htmlFor={id} className={cn('form-label', labelProps?.className)}>
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          {...inputProps}
          className={cn('form-control', inputProps?.className)}
          id={id}
          name={name}
        />
      </>
    );
  }
);
