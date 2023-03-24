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
