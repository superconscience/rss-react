import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { OmitOnly } from '../../types/utils';

type AllLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

type AllInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type AllSelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export type LabelProps<K extends keyof AllLabelProps> = OmitOnly<AllLabelProps, K>;

export type InputProps<K extends keyof AllInputProps> = OmitOnly<AllInputProps, K>;

export type SelectProps<K extends keyof AllSelectProps> = OmitOnly<AllSelectProps, K>;

export type DefaultLabelProps = LabelProps<'htmlFor'>;

export type DefaultTextInputProps = InputProps<'id' | 'name'>;

export type DefaultSelectProps = SelectProps<'id' | 'name'>;

export type DefaultCheckboxProps = InputProps<'id' | 'name' | 'type'>;

export type DefaultRadioProps = InputProps<'id' | 'name' | 'type' | 'value'>;
