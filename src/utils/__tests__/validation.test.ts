import { ZodError } from 'zod';

import { formSchema } from '../validation';

describe('validation schema', () => {
  it('should pass with valid data', () => {
    const data = {
      name: 'John',
      age: 25,
      email: 'test@test.com',
      password: 'Test123!',
      confirm: 'Test123!',
      gender: 'male',
      accept: true,
      country: 'US',
    };
    expect(formSchema.parse(data)).toEqual(data);
  });

  it('should throw an error with invalid data', () => {
    expect(() => formSchema.parse({})).toThrow(ZodError);
  });
});
