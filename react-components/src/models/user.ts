export type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  birthdate: string;
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
  birthdate: '22.12.2022',
  city: 'City',
  state: 'State',
  gender: 'male',
  zip: 44444,
  image: '',
};
