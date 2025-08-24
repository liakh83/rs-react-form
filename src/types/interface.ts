export interface FormData {
  type: 'uncontrolled' | 'controlled';
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  accept: boolean;
  picture?: string;
  country: string;
}
