import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { OmitOnly } from '../../types/utils';

export type AllLabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export type AllInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type AllSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export type LabelProps<K extends keyof AllLabelProps> = OmitOnly<AllLabelProps, K>;

export type InputProps<K extends keyof AllInputProps> = OmitOnly<AllInputProps, K>;

export type SelectProps<K extends keyof AllSelectProps> = OmitOnly<AllSelectProps, K>;

export type DefaultLabelProps = LabelProps<'htmlFor'>;

export type DefaultTextInputProps = InputProps<'id' | 'name' | 'defaultValue'>;

export type DefaultSelectProps = SelectProps<'id' | 'name' | 'defaultValue'>;

export type DefaultCheckboxProps = InputProps<'id' | 'name' | 'type' | 'defaultChecked'>;

export type DefaultRadioProps = InputProps<'id' | 'name' | 'type' | 'value' | 'defaultChecked'>;

export type ValidClassName = 'valid' | 'invalid';

export type Validatable = {
  validClassName: ValidClassName | null;
};

export type UncontrollableInput = { value?: AllInputProps['defaultValue'] };

export type UncontrollableSelect = { value?: AllSelectProps['defaultValue'] };

export type UncontrollableCheckbox = { checked?: AllInputProps['defaultChecked'] };

export type UncontrollableRadio = { checked?: AllInputProps['defaultChecked'] };
