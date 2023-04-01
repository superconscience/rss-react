import cn from 'classnames';
import { FC, FormEventHandler, ReactNode, RefObject, createRef, useState } from 'react';
import { User } from '../../models/user';
import { getRandomId } from '../../utils/functions';
import { CheckboxInput } from '../ui/checkbox/checkbox';
import { ValidClassName } from '../ui/common';
import { TextInput } from '../ui/input/text-input';
import { RadioInput } from '../ui/radio/radio';
import { Select } from '../ui/select/select';
import { UploadImage } from '../upload-image/upload-image';
import { ValidationResult, validation } from './validate';

export type RegisterFormProps = {
  addUser: (user: User) => void;
  showAlert: () => void;
};

type KeysForRefs = Exclude<keyof RegisterFormElements, 'gender'> | 'genderMale' | 'genderFemale';

export type RegisterFormComponentState = {
  image: string | null;
  validated: boolean;
  errors: FormErrors;
};

export type RegisterFormElements = {
  name: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  birthdate: HTMLInputElement;
  city: HTMLInputElement;
  state: HTMLSelectElement;
  zip: HTMLInputElement;
  image: HTMLInputElement;
  gender: HTMLInputElement;
  agree: HTMLInputElement;
};

type FormErrors = Record<keyof RegisterFormElements, string[]>;

const registerFormInitialState: RegisterFormComponentState = {
  image: null,
  validated: false,
  errors: {
    name: [],
    lastName: [],
    email: [],
    birthdate: [],
    state: [],
    city: [],
    image: [],
    zip: [],
    gender: [],
    agree: [],
  },
};

export const RegisterForm: FC<RegisterFormProps> = ({ addUser, showAlert }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>();
  const [errors, setErrors] = useState<FormErrors>({
    name: [],
    lastName: [],
    email: [],
    birthdate: [],
    state: [],
    city: [],
    image: [],
    zip: [],
    gender: [],
    agree: [],
  });

  const formRef: RefObject<HTMLFormElement> = createRef<HTMLFormElement>();

  const formElementsRefs: {
    [K in Exclude<KeysForRefs | keyof RegisterFormElements, 'gender'>]: K extends
      | 'genderMale'
      | 'genderFemale'
      ? RefObject<RegisterFormElements['gender']>
      : K extends keyof RegisterFormElements
      ? RefObject<RegisterFormElements[K]>
      : never;
  } = {
    name: createRef<HTMLInputElement>(),
    lastName: createRef<HTMLInputElement>(),
    email: createRef<HTMLInputElement>(),
    birthdate: createRef<HTMLInputElement>(),
    state: createRef<HTMLSelectElement>(),
    city: createRef<HTMLInputElement>(),
    image: createRef<HTMLInputElement>(),
    zip: createRef<HTMLInputElement>(),
    genderMale: createRef<HTMLInputElement>(),
    genderFemale: createRef<HTMLInputElement>(),
    agree: createRef<HTMLInputElement>(),
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    const errors = validate();
    const isValid = !hasErrors(errors);

    setErrors(errors);
    setValidated(true);

    if (isValid) {
      const newUser = extractUser();
      addUser(newUser);
      showAlert();
      resetForm();
    }
  };

  function validate(): FormErrors {
    const errors = { ...registerFormInitialState.errors };
    const setError = (name: keyof typeof errors, result: ValidationResult) => {
      if (!result.isValid) {
        errors[name] = result.messages;
      }
    };
    Object.entries(validation).forEach(([name, { validate }]) => {
      const typedName = name as keyof typeof validation;
      if (typedName === 'agree' || typedName === 'gender' || typedName === 'image') {
        return;
      }
      const element = formElementsRefs[typedName].current;
      if (element) {
        const result = validate(element.value);
        setError(typedName, result);
      }
    });
    const { image, agree, genderMale, genderFemale } = formElementsRefs;
    if (image.current) {
      const result = validation.image.validate(image.current.files?.[0] || null);
      setError('image', result);
    }
    if (agree.current) {
      const result = validation.agree.validate(agree.current.checked);
      setError('agree', result);
    }
    if (genderMale.current && genderFemale.current) {
      const result = validation.agree.validate(
        genderMale.current.checked || genderFemale.current.checked
      );
      setError('gender', result);
    }
    return errors;
  }

  function resetForm(): void {
    formRef.current?.reset();
    setImage(null);
    setErrors({ ...registerFormInitialState.errors });
    setValidated(false);
  }

  function hasErrors(errors: FormErrors): boolean {
    return Object.values(errors).some((messages) => messages.length > 0);
  }

  function setUploadImage(image: string | null): void {
    setImage(image);
  }

  function extractUser(): User {
    const { name, lastName, email, birthdate, state, city, zip, genderMale } = formElementsRefs;
    return {
      id: getRandomId(),
      name: name.current?.value || '',
      lastName: lastName.current?.value || '',
      email: email.current?.value || '',
      birthdate: new Date(birthdate?.current?.value || ''),
      state: state.current?.value || '',
      city: city.current?.value || '',
      zip: Number(zip.current?.value) || 0,
      image: image || '',
      gender: genderMale.current?.checked ? 'male' : 'female',
    };
  }

  function errorElements(name: keyof RegisterFormElements): ReactNode {
    const messages = errors[name];
    return (
      (messages.length > 0 &&
        messages.map((message) => (
          <div key={message} className="invalid-feedback">
            {message}
          </div>
        ))) ||
      null
    );
  }

  function getValidationResultClassName(
    name: keyof RegisterFormComponentState['errors']
  ): ValidClassName | null {
    if (!validated) {
      return null;
    }
    return errors[name].length > 0 ? 'invalid' : 'valid';
  }

  return (
    <>
      <div className="row align-items-start border-end">
        <div>
          <h2>Add User</h2>
        </div>

        <form
          className={cn('row g-3', { 'was-validated': validated })}
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate={true}
        >
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Name"
              name="name"
              ref={formElementsRefs.name}
              validClassName={getValidationResultClassName('name')}
            />
            {errorElements('name')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Last Name"
              name="lastName"
              ref={formElementsRefs.lastName}
              validClassName={getValidationResultClassName('lastName')}
            />
            {errorElements('lastName')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Email"
              name="email"
              ref={formElementsRefs.email}
              inputProps={{ type: 'email' }}
              validClassName={getValidationResultClassName('email')}
            />
            {errorElements('email')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Birth Date"
              name="birthdate"
              ref={formElementsRefs.birthdate}
              inputProps={{ type: 'date' }}
              validClassName={getValidationResultClassName('birthdate')}
            />
            {errorElements('birthdate')}
          </div>
          <div className="col-md-12 col-6">
            <TextInput
              label="City"
              name="city"
              ref={formElementsRefs.city}
              validClassName={getValidationResultClassName('city')}
            />
            {errorElements('city')}
          </div>
          <div className="col-md-12 col-6">
            <TextInput
              label="Zip"
              name="zip"
              ref={formElementsRefs.zip}
              inputProps={{ maxLength: 5 }}
              validClassName={getValidationResultClassName('zip')}
            />
            {errorElements('zip')}
          </div>
          <div className="col-12">
            <Select
              label="State"
              name="state"
              ref={formElementsRefs.state}
              validClassName={getValidationResultClassName('state')}
            >
              <option value={0} style={{ display: 'none' }}>
                Choose state...
              </option>
              <option>Japan</option>
              <option>USA</option>
              <option>Italy</option>
              <option>Latvia</option>
            </Select>
            {errorElements('state')}
          </div>

          <div className="col-12">
            <UploadImage
              name="image"
              setImage={setUploadImage}
              ref={formElementsRefs.image}
              validClassName={getValidationResultClassName('image')}
            />
            {errorElements('image')}
            {image && <img src={image} alt={'image'} width="100%" className="mt-3" />}
          </div>
          <div className="col-12">
            <label className="form-label">Gender</label>
            <div>
              <RadioInput
                label="Male"
                name="gender"
                value="male"
                ref={formElementsRefs.genderMale}
                labelProps={{ className: 'btn' }}
                inputProps={{ className: 'btn-check' }}
                validClassName={getValidationResultClassName('gender')}
                checked
              />
              <RadioInput
                label="Female"
                name="gender"
                value="female"
                ref={formElementsRefs.genderFemale}
                labelProps={{ className: 'btn' }}
                inputProps={{ className: 'btn-check' }}
                validClassName={getValidationResultClassName('gender')}
              />
              {errorElements('gender')}
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <CheckboxInput
                label="I agree with the fact that my data will be displayed somewhere on this page"
                name="agree"
                ref={formElementsRefs.agree}
                validClassName={getValidationResultClassName('agree')}
              />
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
