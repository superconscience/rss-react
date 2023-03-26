import cn from 'classnames';
import { Component, FormEventHandler, RefObject, createRef } from 'react';
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

export class RegisterForm extends Component<RegisterFormProps, RegisterFormComponentState> {
  static readonly classNames = {
    wasValidated: 'was-validated',
  };

  formElementsRefs: {
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

  formRef: RefObject<HTMLFormElement>;
  state: RegisterFormComponentState = registerFormInitialState;

  constructor(props: RegisterFormProps) {
    super(props);
    this.formRef = createRef<HTMLFormElement>();
  }

  useId = getRandomId();

  handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    const errors = this.validate();
    const isValid = !this.hasErrors(errors);

    this.setState((prev) => {
      return { ...prev, errors, validated: true };
    });

    if (isValid) {
      const newUser = this.extractUser();
      this.props.addUser(newUser);
      this.props.showAlert();
      this.resetForm();
    }
  };

  setImage = (src: string | null) => {
    this.setState({ image: src });
  };

  validate = (): FormErrors => {
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
      const element = this.formElementsRefs[typedName].current;
      if (element) {
        const result = validate(element.value);
        setError(typedName, result);
      }
    });
    const { image, agree, genderMale, genderFemale } = this.formElementsRefs;
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
  };

  resetForm = () => {
    this.formRef.current?.reset();
    this.setImage(null);
    this.setState({
      errors: { ...registerFormInitialState.errors },
      validated: false,
    });
  };

  hasErrors = (errors: FormErrors): boolean =>
    Object.values(errors).some((messages) => messages.length > 0);

  extractUser = (): User => {
    const { name, lastName, email, birthdate, state, city, zip, genderMale } =
      this.formElementsRefs;
    return {
      id: getRandomId(),
      name: name.current?.value || '',
      lastName: lastName.current?.value || '',
      email: email.current?.value || '',
      birthdate: new Date(birthdate?.current?.value || ''),
      state: state.current?.value || '',
      city: city.current?.value || '',
      zip: Number(zip.current?.value) || 0,
      image: this.state.image || '',
      gender: genderMale.current?.checked ? 'male' : 'female',
    };
  };

  errorElements = (name: keyof RegisterFormElements) => {
    const { errors } = this.state;
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
  };

  getValidationResultClassName = (
    name: keyof RegisterFormComponentState['errors']
  ): ValidClassName | null => {
    const { errors, validated } = this.state;
    if (!validated) {
      return null;
    }
    return errors[name].length > 0 ? 'invalid' : 'valid';
  };

  render() {
    const { validated, image } = this.state;
    return (
      <>
        <div className="row align-items-start border-end">
          <div>
            <h2>Add User</h2>
          </div>

          <form
            className={cn('row g-3', { 'was-validated': validated })}
            ref={this.formRef}
            onSubmit={this.handleSubmit}
            noValidate={true}
          >
            <div className="col-md-12 col-sm-6 col-6">
              <TextInput
                label="Name"
                name="name"
                ref={this.formElementsRefs.name}
                validClassName={this.getValidationResultClassName('name')}
              />
              {this.errorElements('name')}
            </div>
            <div className="col-md-12 col-sm-6 col-6">
              <TextInput
                label="Last Name"
                name="lastName"
                ref={this.formElementsRefs.lastName}
                validClassName={this.getValidationResultClassName('lastName')}
              />
              {this.errorElements('lastName')}
            </div>
            <div className="col-md-12 col-sm-6 col-6">
              <TextInput
                label="Email"
                name="email"
                ref={this.formElementsRefs.email}
                inputProps={{ type: 'email' }}
                validClassName={this.getValidationResultClassName('email')}
              />
              {this.errorElements('email')}
            </div>
            <div className="col-md-12 col-sm-6 col-6">
              <TextInput
                label="Birth Date"
                name="birthdate"
                ref={this.formElementsRefs.birthdate}
                inputProps={{ type: 'date' }}
                validClassName={this.getValidationResultClassName('birthdate')}
              />
              {this.errorElements('birthdate')}
            </div>
            <div className="col-md-12 col-6">
              <TextInput
                label="City"
                name="city"
                ref={this.formElementsRefs.city}
                validClassName={this.getValidationResultClassName('city')}
              />
              {this.errorElements('city')}
            </div>
            <div className="col-md-12 col-6">
              <TextInput
                label="Zip"
                name="zip"
                ref={this.formElementsRefs.zip}
                inputProps={{ maxLength: 5 }}
                validClassName={this.getValidationResultClassName('zip')}
              />
              {this.errorElements('zip')}
            </div>
            <div className="col-12">
              <Select
                label="State"
                name="state"
                ref={this.formElementsRefs.state}
                validClassName={this.getValidationResultClassName('state')}
              >
                <option value={0} style={{ display: 'none' }}>
                  Choose state...
                </option>
                <option>Japan</option>
                <option>USA</option>
                <option>Italy</option>
                <option>Latvia</option>
              </Select>
              {this.errorElements('state')}
            </div>

            <div className="col-12">
              <UploadImage
                name="image"
                setImage={this.setImage}
                ref={this.formElementsRefs.image}
                validClassName={this.getValidationResultClassName('image')}
              />
              {this.errorElements('image')}
              {image && <img src={image} alt={'image'} width="100%" className="mt-3" />}
            </div>
            <div className="col-12">
              <label className="form-label">Gender</label>
              <div>
                <RadioInput
                  label="Male"
                  name="gender"
                  value="male"
                  ref={this.formElementsRefs.genderMale}
                  labelProps={{ className: 'btn' }}
                  inputProps={{ className: 'btn-check' }}
                  validClassName={this.getValidationResultClassName('gender')}
                  checked
                />
                <RadioInput
                  label="Female"
                  name="gender"
                  value="female"
                  ref={this.formElementsRefs.genderFemale}
                  labelProps={{ className: 'btn' }}
                  inputProps={{ className: 'btn-check' }}
                  validClassName={this.getValidationResultClassName('gender')}
                />
                {this.errorElements('gender')}
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <CheckboxInput
                  label="I agree with the fact that my data will be displayed somewhere on this page"
                  name="agree"
                  ref={this.formElementsRefs.agree}
                  validClassName={this.getValidationResultClassName('agree')}
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
  }
}
