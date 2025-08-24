import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(6, 'Min 6 chars')
  .regex(/[0-9]/, 'At least 1 number')
  .regex(/[A-Z]/, 'At least 1 uppercase letter')
  .regex(/[a-z]/, 'At least 1 lowercase letter')
  .regex(/[^A-Za-z0-9]/, 'At least 1 special character');

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name required')
      .regex(/^[A-Z]/, 'Must start with uppercase'),
    age: z.number().min(0, 'No negatives number'),
    email: z.email('Invalid email'),
    password: passwordSchema,
    confirm: z.string(),
    gender: z.string().min(1, 'Pick gender'),
    accept: z.boolean().refine((v) => v === true, 'Must accept terms'),
    picture: z.string().optional(),
    country: z.string().min(1, 'Pick country'),
  })
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match',
  });

export type FormDataType = z.infer<typeof formSchema>;
