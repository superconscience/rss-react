import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { fakeUser } from '../../models/user';
import { UserCard } from './user-card';

const component = <UserCard user={fakeUser} />;

describe('UserCard', async () => {
  it('renders contents', async () => {
    const { unmount, getByText } = render(component);
    const nameRegexp = new RegExp(fakeUser.name, 'i');
    const lastNameRegexp = new RegExp(fakeUser.lastName, 'i');
    const emailRegexp = new RegExp(fakeUser.email, 'i');
    const birthdateRegexp = new RegExp(fakeUser.birthdate.toLocaleDateString(), 'i');
    const stateRegexp = new RegExp(fakeUser.state, 'i');
    const cityRegexp = new RegExp(fakeUser.city, 'i');
    const genderRegexp = new RegExp(fakeUser.gender, 'i');
    const zipRegexp = new RegExp(fakeUser.zip.toString(), 'i');

    [
      nameRegexp,
      lastNameRegexp,
      emailRegexp,
      birthdateRegexp,
      stateRegexp,
      cityRegexp,
      genderRegexp,
      zipRegexp,
    ].forEach((regexp) => {
      expect(getByText(regexp)).toBeInTheDocument();
    });

    unmount();
  });
});
