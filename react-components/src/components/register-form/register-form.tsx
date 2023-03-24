import { ChangeEvent, Component, FormEventHandler, RefObject, createRef } from 'react';
import './register-form.scss';
import { Gender, User } from '../../models/user';
import classNames from 'classnames';
import { EMAIL_REGEXP } from '../../utils/constants';
import { readImage } from '../../utils/functions';
import { UploadImage } from '../upload-image/upload-image';

export type RegisterFormProps = {
  addUser: (user: User) => void;
};

export type RegisterFormComponentState = {
  image: string | null;
  validated: boolean;
  submitted: boolean;
  errors: FormErrors;
};

type FormStateData<T> = { value: T };

type FormState = {
  name: FormStateData<string>;
  lastName: FormStateData<string>;
  email: FormStateData<string>;
  birthdate: FormStateData<string>;
  city: FormStateData<string>;
  state: FormStateData<string>;
  zip: FormStateData<string>;
  image: FormStateData<File>;
  gender: FormStateData<'male' | 'female'>;
  agree: FormStateData<boolean>;
};

type FormErrors = Record<keyof FormState, string[]>;

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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

const validation: Record<
  keyof FormState,
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
      if (typeof value !== 'string') {
        throw Error(`State input should have a text type`);
      }
      if (value === '0') {
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

const RegisterFormInitialState: RegisterFormComponentState = {
  image: null,
  validated: false,
  submitted: false,
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

  formRef: RefObject<HTMLFormElement>;
  state: RegisterFormComponentState = RegisterFormInitialState;

  constructor(props: RegisterFormProps) {
    super(props);
    this.formRef = createRef<HTMLFormElement>();
  }

  handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }
    const formData = new FormData(form);
    const errors = this.validate(formData);
    const isValid = !this.hasErrors(errors);

    if (!isValid) {
      this.setFormValidity(errors);
    }
    this.setState((prev) => {
      return { ...prev, errors, submitted: isValid, validated: true };
    });
    if (isValid) {
      const newUser = this.extractUser(formData);
      this.props.addUser(newUser);
    }
  };

  setImage = (src: string | null) => {
    this.setState({ image: src });
  };

  onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      if (file.size) {
        readImage(file, (src) => {
          this.setState({ image: src });
        });
      }
    } else {
      this.setState({ image: null });
    }
  };

  validate = (formData: FormData): FormErrors => {
    const errors = { ...RegisterFormInitialState.errors };
    Object.entries(validation).forEach(([name, { validate }]) => {
      const result = validate(formData.get(name) as string | boolean | File);
      if (!result.isValid) {
        errors[name as keyof FormState] = result.messages;
      }
    });
    return errors;
  };

  setFormValidity = (errors: FormErrors): void => {
    const form = this.formRef.current;
    const setCustomValidity = (element: Element | RadioNodeList | null, validity: string) => {
      if (element instanceof RadioNodeList) {
        element.forEach((radio) => (radio as HTMLInputElement).setCustomValidity(validity));
      } else if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
        element.setCustomValidity(validity);
      }
    };
    if (!form) {
      return;
    }
    Object.entries(errors).forEach(([name, messages]) => {
      const element = form.elements.namedItem(name);
      if (messages.length > 0) {
        setCustomValidity(element, 'invalid');
      } else {
        setCustomValidity(element, '');
      }
    });
  };

  hasErrors = (errors: FormErrors): boolean =>
    Object.values(errors).some((messages) => messages.length > 0);

  extractUser = (formData: FormData): User => {
    const name = formData.get('name') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const birthdate = formData.get('birthdate') as string;
    const state = formData.get('state') as string;
    const city = formData.get('city') as string;
    const image = formData.get('image') as File;
    const gender = formData.get('gender') as string;
    const zip = formData.get('zip') as string;
    console.log(image);
    if (
      [name, lastName, email, birthdate, state, city, gender, zip].some(
        (value) => typeof value !== 'string'
      ) ||
      !(image instanceof File)
    ) {
      throw Error('Wrong User');
    }
    return {
      name: name || '',
      lastName: lastName || '',
      email: email || '',
      birthdate: new Date(birthdate),
      state: state || '',
      city: city || '',
      image: '',
      gender: (gender as Gender) || '',
      zip: Number(zip),
    };
  };

  errorElements = (name: keyof FormState) => {
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

  render() {
    const { validated, image } = this.state;
    return (
      <div className="row align-items-start">
        <div>
          <h2>Add User</h2>
        </div>

        <form
          className={classNames('row g-3', { 'was-validated': validated })}
          ref={this.formRef}
          onSubmit={this.handleSubmit}
          noValidate={true}
        >
          <div className="col-md-12 col-sm-6 col-6">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="name"
              defaultValue="Username"
            />
            {this.errorElements('name')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              name="lastName"
              defaultValue="Lastname"
            />
            {this.errorElements('lastName')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              defaultValue="test@test.com"
            />
            {this.errorElements('email')}
          </div>
          <div className="col-md-12 col-sm-6 col-6">
            <label htmlFor="inputBirthdate" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              className="form-control"
              id="inputBirthdate"
              name="birthdate"
              defaultValue="2023-03-20"
            />
            {this.errorElements('birthdate')}
          </div>
          <div className="col-xxl-8 col-md-12 col-6">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              name="city"
              defaultValue="London"
            />
            {this.errorElements('city')}
          </div>
          <div className="col-xxl-4 col-md-12 col-6">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="zip"
              maxLength={5}
              defaultValue="90210"
            />
            {this.errorElements('zip')}
          </div>
          <div className="col-12">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select id="inputState" className="form-select" name="state" defaultValue={'Japan'}>
              <option value={0} style={{ display: 'none' }}>
                Choose state...
              </option>
              <option>Japan</option>
              <option>USA</option>
              <option>Italy</option>
              <option>Latvia</option>
            </select>
            {this.errorElements('state')}
          </div>

          <div className="col-12">
            <UploadImage name="image" setImage={this.setImage} />
            {this.errorElements('image')}
            {image && <img src={image} alt={'image'} width="100%" className="mt-3" />}
          </div>
          <div className="col-12">
            <label className="form-label">Gender</label>
            <div>
              <input
                type="radio"
                className="btn-check"
                name="gender"
                id="genderMale"
                autoComplete="off"
                value="male"
                defaultChecked
              />
              <label className="btn btn-secondary" htmlFor="genderMale">
                Male
              </label>

              <input
                type="radio"
                className="btn-check"
                name="gender"
                id="genderFemale"
                value="female"
                autoComplete="off"
              />
              <label className="btn btn-secondary" htmlFor="genderFemale">
                Female
              </label>
              {this.errorElements('gender')}
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                name="agree"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="gridCheck">
                I agree with the fact that my data will be displayed below somewhere on this page
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}
