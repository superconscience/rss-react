import cn from 'classnames';
import { PropsWithChildren, forwardRef } from 'react';
import {
  DefaultLabelProps,
  DefaultSelectProps,
  UncontrollableSelect,
  Validatable,
} from '../common';

export type SelectProps = {
  selectProps?: DefaultSelectProps;
  labelProps?: DefaultLabelProps;
  name?: string;
  label: string;
};

export const Select = forwardRef<
  HTMLSelectElement,
  PropsWithChildren<SelectProps> & Validatable & UncontrollableSelect
>(({ label, name, labelProps, selectProps, children, validClassName, value }, ref) => {
  const id = `select-${label}`;
  return (
    <>
      <label {...labelProps} htmlFor={id} className={cn('form-label', labelProps?.className)}>
        {label}
      </label>
      <select
        ref={ref}
        className={cn('form-control', validClassName, selectProps?.className)}
        id={id}
        name={name}
        defaultValue={value}
        {...selectProps}
      >
        {children}
      </select>
    </>
  );
});
