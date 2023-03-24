import cn from 'classnames';
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
  SelectHTMLAttributes,
  forwardRef,
} from 'react';
import { OmitOnly } from '../../../types/utils';
import { getRandomId } from '../../../utils/functions';

export type TextInputProps = {
  selectProps?: OmitOnly<
    DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    'id' | 'name'
  >;
  labelProps?: OmitOnly<
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    'htmlFor'
  >;
  name: string;
  label: string;
};

export const Select = forwardRef<HTMLSelectElement, PropsWithChildren<TextInputProps>>(
  ({ label, name, labelProps, selectProps, children }, ref) => {
    const id = `select-${getRandomId()}`;
    return (
      <>
        <label {...labelProps} htmlFor={id} className={cn('form-label', labelProps?.className)}>
          {label}
        </label>
        <select
          ref={ref}
          {...selectProps}
          className={cn('form-control', selectProps?.className)}
          id={id}
          name={name}
        >
          {children}
          {/* <option value={0} style={{ display: 'none' }}>
            Choose state...
          </option>
          <option>Japan</option>
          <option>USA</option>
          <option>Italy</option>
          <option>Latvia</option> */}
        </select>
      </>
    );
  }
);
