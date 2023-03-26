import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { createValidationResult, validateNameFunc, validation } from './validate';

const SHOULD_RETURN_CORRECT_RESULT = 'should return correct result';

describe('validate', () => {
  describe('createValidationResult', () => {
    it(SHOULD_RETURN_CORRECT_RESULT, () => {
      const emptyMessages: string[] = [];
      const messages = ['message 1', 'message 2'];
      const emptyResult = createValidationResult(emptyMessages);
      const result = createValidationResult(messages);

      expect(emptyResult).toBeInstanceOf(Object);
      expect(emptyResult).toEqual({ isValid: true });

      expect(result).toHaveProperty('isValid');
      expect(result).toEqual({ isValid: false, messages });
    });
  });
  describe('validateNameFunc', () => {
    it('should return a function', () => {
      const func = validateNameFunc('name');
      expect(func).toBeInstanceOf(Function);
    });
    it(`result func should return correct result`, () => {
      const name = 'Name';
      const func = validateNameFunc(name);
      const emptyStringResult = func('');
      const startWithEmptySpaceResult = func(' Name');
      const notCapitalizedResult = func('name');
      const validResult = func('Name');

      expect(emptyStringResult.isValid).toEqual(false);
      if (!emptyStringResult.isValid) {
        expect(emptyStringResult.messages).toContain(`${name} is required`);
      }

      expect(startWithEmptySpaceResult.isValid).toEqual(false);
      if (!startWithEmptySpaceResult.isValid) {
        expect(startWithEmptySpaceResult.messages).toContain(
          `${name} should not start with empty space`
        );
      }

      expect(notCapitalizedResult.isValid).toEqual(false);
      if (!notCapitalizedResult.isValid) {
        expect(notCapitalizedResult.messages).toContain(
          `${name} should start with an uppercase letter`
        );
      }

      expect(validResult.isValid).toEqual(true);
    });
    describe('validate funcs of validation object', () => {
      const {
        name: { validate: validateName },
        lastName: { validate: validateLastName },
        email: { validate: validateEmail },
        birthdate: { validate: validateBirthdate },
        city: { validate: validateCity },
        image: { validate: validateImage },
        state: { validate: validateState },
        gender: { validate: validateGender },
        zip: { validate: validateZip },
        agree: { validate: validateAgree },
      } = validation;

      it('name ans lastName validators validate prop should same result as validateNameFunc func', () => {
        expect(validateName('name')).toEqual(validateNameFunc('Name')('name'));
        expect(validateLastName('name')).toEqual(validateNameFunc('Last Name')('name'));
      });

      it('required', () => {
        [
          validateName(''),
          validateLastName(''),
          validateEmail(''),
          validateBirthdate(''),
          validateCity(''),
          validateState('0'),
          validateZip(''),
          validateImage(null),
          validateGender(''),
          validateAgree(false),
        ].forEach((result) => {
          expect(result.isValid).toEqual(false);
        });
      });

      it('should throw errors', () => {
        [
          validateName,
          validateLastName,
          validateEmail,
          validateCity,
          validateZip,
          validateImage,
          validateGender,
        ].forEach((func) => expect(func).toThrowError(Error));
      });

      describe('email validator', () => {
        it(SHOULD_RETURN_CORRECT_RESULT, () => {
          expect(validateEmail('wrong_email')).toEqual({
            isValid: false,
            messages: ['Invalid email'],
          });
          expect(validateEmail('correct_email@example.com')).toEqual({
            isValid: true,
          });
        });
      });

      describe('zip validator', () => {
        it(SHOULD_RETURN_CORRECT_RESULT, () => {
          expect(validateZip('asf')).toEqual({
            isValid: false,
            messages: ['Zip must be a number', 'Zip must be 5 characters long'],
          });
          expect(validateZip('123')).toEqual({
            isValid: false,
            messages: ['Zip must be 5 characters long'],
          });
          expect(validateZip('12323')).toEqual({
            isValid: true,
          });
        });
      });

      describe('image validator', () => {
        it(SHOULD_RETURN_CORRECT_RESULT, () => {
          expect(validateImage(new File([''], 'image'))).toEqual({ isValid: true });
        });
      });
    });
  });
});
