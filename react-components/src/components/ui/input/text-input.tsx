import cn from 'classnames';
import { forwardRef } from 'react';
import { getRandomId } from '../../../utils/functions';
import { DefaultLabelProps, DefaultTextInputProps } from '../common';

export type TextInputProps = {
  inputProps?: DefaultTextInputProps;
  labelProps?: DefaultLabelProps;
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
