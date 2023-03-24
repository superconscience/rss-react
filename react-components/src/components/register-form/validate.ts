import { EMAIL_REGEXP } from '../../utils/constants';
import { RegisterFormState } from './register-form';

type ValidateFunc = (value: string | boolean | File | null) => ValidationResult;

type ValidationResult = { isValid: true } | { isValid: false; messages: string[] };

const createValidationResult = (messages: string[]): ValidationResult =>
  messages.length > 0 ? { isValid: false, messages } : { isValid: true };

const validateNameFunc: (name: string) => ValidateFunc = (name) => (value) => {
  const messages: string[] = [];
  if (typeof value !== 'string') {
    throw Error(`${name} input should have a text type`);
  }
  if (!value.trim()) {
    messages.push(`${name} is required`);
  }
  if (!value[0]) {
    messages.push(`${name} should not start with empty space`);
  }
  if (value[0] && value[0] === value[0].toLowerCase()) {
    messages.push(`${name} should start with an uppercase letter`);
  }
  return createValidationResult(messages);
};

export const validation: Record<
  keyof RegisterFormState,
  {
    validate: ValidateFunc;
  }
> = {
  email: {
    validate: (value) => {
      const messages: string[] = [];
      if (typeof value !== 'string') {
        throw Error('Email input should have a text or email type');
      }
      if (!EMAIL_REGEXP.test(value.toLowerCase())) {
        messages.push('Invalid email');
      }
      return createValidationResult(messages);
    },
  },
  name: {
    validate: validateNameFunc('Name'),
  },
  lastName: {
    validate: validateNameFunc('Last Name'),
  },
  birthdate: {
    validate: (value) => {
      const messages: string[] = [];
      if (!value) {
        messages.push(`Birth Date is required`);
      }
      return createValidationResult(messages);
    },
  },
  city: {
    validate: (value) => {
      const messages: string[] = [];
      if (typeof value !== 'string') {
        throw Error(`City input should have a text type`);
      }
      if (!value.trim()) {
        messages.push(`City is required`);
      }
      return createValidationResult(messages);
    },
  },
  state: {
    validate: (value) => {
      const messages: string[] = [];
      if (typeof value !== 'string' && value !== null) {
        throw Error(`State input should have a text type`);
      }
      if (value === '0' || value === null) {
        messages.push(`State is required`);
      }
      return createValidationResult(messages);
    },
  },
  zip: {
    validate: (value) => {
      const messages: string[] = [];
      if (typeof value !== 'string') {
        throw Error(`Zip input should have a text or number type`);
      }
      if (!value.trim()) {
        messages.push(`Zip is required`);
      }
      if (Number(value).toString() !== value) {
        messages.push('Zip must be a number');
      }
      if (value.trim().length !== 5) {
        messages.push('Zip must be 5 characters long');
      }
      return createValidationResult(messages);
    },
  },
  image: {
    validate: (value) => {
      const messages: string[] = [];
      if (!(value instanceof File)) {
        throw Error(`Image input should have a file type`);
      }
      if (!value.name) {
        messages.push(`Image is required`);
      }
      return createValidationResult(messages);
    },
  },
  gender: {
    validate: (value) => {
      const messages: string[] = [];
      if (value != null && typeof value !== 'string') {
        throw Error(`Gender input should have a text or number type`);
      }
      if (value == null || !value.trim()) {
        messages.push(`Gender is required`);
      }
      return createValidationResult(messages);
    },
  },
  agree: {
    validate: (value) => {
      const messages: string[] = [];
      if (value !== 'on') {
        messages.push('Error');
      }
      return createValidationResult(messages);
    },
  },
};
