import classNames from 'classnames';
import { forwardRef } from 'react';
import { getRandomId } from '../../../utils/functions';
import { DefaultCheckboxProps, DefaultLabelProps } from '../common';

export type CheckboxInputProps = {
  inputProps?: DefaultCheckboxProps;
  labelProps?: DefaultLabelProps;
  name: string;
  label: string;
};

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, name, inputProps, labelProps }, ref) => {
    const id = `checkbox-${getRandomId()}`;
    return (
      <>
        <input
          ref={ref}
          type="checkbox"
          {...inputProps}
          className={classNames('form-check-input', inputProps?.className)}
          name={name}
          id={id}
          autoComplete="off"
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
  }
);
