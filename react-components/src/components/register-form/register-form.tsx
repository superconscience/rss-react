import cn from 'classnames';
import { FC, ReactNode, RefObject, createRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppContext } from '../../context/app-context';
import { useUsers } from '../../hooks/use-users';
import { Gender, User } from '../../models/user';
import { getRandomId } from '../../utils/functions';
import { CheckboxInput } from '../ui/checkbox/checkbox';
import { ValidClassName } from '../ui/common';
import { TextInput } from '../ui/input/text-input';
import { RadioInput } from '../ui/radio/radio';
import { Select } from '../ui/select/select';
import { UploadImage } from '../upload-image/upload-image';
import { customValidation, defaultHookFormValidationMessages } from './validate';

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

export type RegisterFormState = {
  name: string;
  lastName: string;
  email: string;
  birthdate: string;
  state: string;
  city: string;
  image: File;
  zip: string;
  gender: Gender;
  agree: boolean;
};

export const RegisterForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormState>({ reValidateMode: 'onSubmit' });
  const [users, setUsers] = useUsers();
  const [image, setImage] = useState<string | null>();
  const {
    usersAlert: { open: showAlert },
  } = useAppContext();

  const formRef: RefObject<HTMLFormElement> = createRef<HTMLFormElement>();

  const wasValidated = Object.values(errors).length > 0;

  const onSubmit: SubmitHandler<RegisterFormState> = (data) => {
    const newUser = extractUser(data);
    setUsers([...users, newUser]);
    showAlert();
    resetForm();
  };

  function resetForm(): void {
    setImage(null);
    reset();
  }

  function setUploadImage(image: string | null): void {
    setImage(image);
  }

  function extractUser(data: RegisterFormState): User {
    const { name, lastName, email, birthdate, state, city, zip, gender } = data;
    return {
      id: getRandomId(),
      name,
      lastName,
      email,
      birthdate: new Date(birthdate).toLocaleDateString(),
      state: state,
      city: city,
      zip: Number(zip) || 0,
      image: image || '',
      gender: gender,
    };
  }

  function errorElements(name: keyof RegisterFormElements): ReactNode {
    const error = errors[name];
    return (
      (error && error.message && <div className="invalid-feedback">{error.message}</div>) || null
    );
  }

  function getValidationResultClassName(
    name: keyof RegisterFormComponentState['errors']
  ): ValidClassName | null {
    if (!wasValidated) {
      return null;
    }
    return errors[name] ? 'invalid' : 'valid';
  }

  return (
    <>
      <div className="row align-items-start border-end">
        <div>
          <h2>Add User</h2>
        </div>

        <form
          className={cn('row g-3', { 'was-validated': wasValidated })}
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          noValidate={true}
        >
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Name"
              validClassName={getValidationResultClassName('name')}
              inputProps={register('name', {
                required: defaultHookFormValidationMessages.name.required,
                validate: customValidation.name,
              })}
            />
            {errorElements('name')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Last Name"
              validClassName={getValidationResultClassName('lastName')}
              inputProps={register('lastName', {
                required: defaultHookFormValidationMessages.lastName.required,
                validate: customValidation.lastName,
              })}
            />
            {errorElements('lastName')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Email"
              inputProps={{
                type: 'email',
                ...register('email', {
                  required: defaultHookFormValidationMessages.email.required,
                  validate: customValidation.email,
                }),
              }}
              validClassName={getValidationResultClassName('email')}
            />
            {errorElements('email')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <TextInput
              label="Birth Date"
              inputProps={{
                type: 'date',
                ...register('birthdate', {
                  required: defaultHookFormValidationMessages.birthdate.required,
                  validate: customValidation.birthdate,
                }),
              }}
              validClassName={getValidationResultClassName('birthdate')}
            />
            {errorElements('birthdate')}
          </div>
          <div className="col-12">
            <Select
              label="State"
              validClassName={getValidationResultClassName('state')}
              selectProps={register('state', {
                validate: customValidation.state,
              })}
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
          <div className="col-md-12 col-6">
            <TextInput
              label="City"
              validClassName={getValidationResultClassName('city')}
              inputProps={register('city', {
                required: defaultHookFormValidationMessages.city.required,
                validate: customValidation.city,
              })}
            />
            {errorElements('city')}
          </div>
          <div className="col-md-12 col-6">
            <TextInput
              label="Zip"
              inputProps={{
                maxLength: 5,
                ...register('zip', {
                  required: defaultHookFormValidationMessages.zip.required,
                  maxLength: { value: 5, message: 'Zip must be 5 characters long' },
                  minLength: { value: 5, message: 'Zip must be 5 characters long' },
                  validate: customValidation.zip,
                }),
              }}
              validClassName={getValidationResultClassName('zip')}
            />
            {errorElements('zip')}
          </div>

          <div className="col-12">
            <UploadImage
              setImage={setUploadImage}
              validClassName={getValidationResultClassName('image')}
              inputProps={{
                ...register('image', {
                  required: defaultHookFormValidationMessages.image.required,
                }),
              }}
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
                labelProps={{ className: 'btn' }}
                inputProps={{
                  className: 'btn-check',
                  ...register('gender', {
                    required: defaultHookFormValidationMessages.gender.required,
                  }),
                }}
                checked
                validClassName={getValidationResultClassName('gender')}
              />
              <RadioInput
                label="Female"
                name="gender"
                value="female"
                labelProps={{ className: 'btn' }}
                inputProps={{
                  className: 'btn-check',
                  ...register('gender', {
                    required: defaultHookFormValidationMessages.gender.required,
                  }),
                }}
                validClassName={getValidationResultClassName('gender')}
              />
              {errorElements('gender')}
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <CheckboxInput
                label="I agree with the fact that my data will be displayed somewhere on this page"
                validClassName={getValidationResultClassName('agree')}
                inputProps={register('agree', { required: true })}
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
