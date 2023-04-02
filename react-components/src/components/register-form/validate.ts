import { EMAIL_REGEXP } from '../../utils/constants';
import { RegisterFormElements, RegisterFormState } from './register-form';
import { Validate, RegisterOptions } from 'react-hook-form';
import moment from 'moment';

const isCapitalized =
  (name: string) =>
  (value: string): boolean | string =>
    (value[0] && value[0] === value[0].toUpperCase()) ||
    `${name} should start with an uppercase letter`;

const createRequiredMessage = (fieldname: string) => `${fieldname} is required.`;

export const customValidation: Record<
  keyof RegisterFormElements,
  | Validate<string, RegisterFormState>
  | Record<string, Validate<string, RegisterFormState>>
  | undefined
> = {
  name: {
    capitalized: isCapitalized('Name'),
  },
  lastName: {
    capitalized: isCapitalized('Last name'),
  },
  email: {
    validEmail: (value) =>
      (value && !EMAIL_REGEXP.test(value.toLowerCase()) && 'Invalid email') || true,
  },
  birthdate: {
    validDate: (value) => moment(value).isValid() || 'Invalid date',
  },
  state: {
    required: (value) => {
      if (value === '0' || value === null) {
        return 'State is required';
      }
      return true;
    },
  },
  city: {},
  gender: {},
  image: {},
  zip: {
    onlyNumbers: (value) => Number(value).toString() === value || 'Zip must be a number',
  },
  agree: {},
};

export const defaultHookFormValidationMessages: Record<
  keyof RegisterFormElements,
  RegisterOptions<RegisterFormState, keyof RegisterFormElements>
> = {
  name: {
    required: createRequiredMessage('Name'),
  },
  lastName: {
    required: createRequiredMessage('Last name'),
  },
  email: {
    required: createRequiredMessage('Email'),
  },
  birthdate: { required: createRequiredMessage('Birth date') },
  state: { required: createRequiredMessage('State') },
  city: { required: createRequiredMessage('City') },
  zip: { required: createRequiredMessage('Zip') },
  gender: { required: createRequiredMessage('Gender') },
  image: { required: createRequiredMessage('Image') },
  agree: {},
};
