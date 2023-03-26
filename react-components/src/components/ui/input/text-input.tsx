import cn from 'classnames';
import { forwardRef } from 'react';
import { getRandomId } from '../../../utils/functions';
import {
  DefaultLabelProps,
  DefaultTextInputProps,
  UncontrollableInput,
  Validatable,
} from '../common';

export type TextInputProps = {
  inputProps?: DefaultTextInputProps;
  labelProps?: DefaultLabelProps;
  name: string;
  label: string;
};

export const TextInput = forwardRef<
  HTMLInputElement,
  TextInputProps & Validatable & UncontrollableInput
>(({ label, name, inputProps, labelProps, validClassName, value }, ref) => {
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
        className={cn('form-control', validClassName, inputProps?.className)}
        id={id}
        name={name}
        defaultValue={value}
      />
    </>
  );
});
