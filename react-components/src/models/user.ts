import fakeImage from '../../../public/vite.svg';

export type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  birthdate: Date;
  city: string;
  state: string;
  zip: number;
  image: string;
  gender: Gender;
};

export type Gender = 'male' | 'female';

export const fakeUser: User = {
  id: '444',
  name: 'Name',
  lastName: 'Lastname',
  email: 'aaa@aaa.cc',
  birthdate: new Date(),
  city: 'City',
  state: 'State',
  gender: 'male',
  zip: 44444,
  image: fakeImage,
};
