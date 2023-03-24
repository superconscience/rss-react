import cn from 'classnames';
import { PropsWithChildren, forwardRef } from 'react';
import { getRandomId } from '../../../utils/functions';
import { DefaultLabelProps, DefaultSelectProps, Validatable } from '../common';

export type SelectProps = {
  selectProps?: DefaultSelectProps;
  labelProps?: DefaultLabelProps;
  name: string;
  label: string;
};

export const Select = forwardRef<HTMLSelectElement, PropsWithChildren<SelectProps> & Validatable>(
  ({ label, name, labelProps, selectProps, children, validClassName }, ref) => {
    const id = `select-${getRandomId()}`;
    return (
      <>
        <label {...labelProps} htmlFor={id} className={cn('form-label', labelProps?.className)}>
          {label}
        </label>
        <select
          ref={ref}
          {...selectProps}
          className={cn('form-control', validClassName, selectProps?.className)}
          id={id}
          name={name}
        >
          {children}
        </select>
      </>
    );
  }
);
