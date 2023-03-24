import classNames from 'classnames';
import { forwardRef } from 'react';
import { getRandomId } from '../../../utils/functions';
import {
  DefaultCheckboxProps,
  DefaultLabelProps,
  UncontrollableCheckbox,
  Validatable,
} from '../common';

export type CheckboxInputProps = {
  inputProps?: DefaultCheckboxProps;
  labelProps?: DefaultLabelProps;
  name: string;
  label: string;
};

export const CheckboxInput = forwardRef<
  HTMLInputElement,
  CheckboxInputProps & Validatable & UncontrollableCheckbox
>(({ label, name, inputProps, labelProps, validClassName, checked }, ref) => {
  const id = `checkbox-${getRandomId()}`;
  return (
    <>
      <input
        ref={ref}
        type="checkbox"
        {...inputProps}
        className={classNames('form-check-input', validClassName, inputProps?.className)}
        name={name}
        id={id}
        autoComplete="off"
        defaultChecked={checked}
      />
      <label
        {...labelProps}
        className={classNames('form-check-label', labelProps?.className)}
        htmlFor={id}
      >
        {label}
      </label>
    </>
  );
});
