import { IUser } from '@/app/users/user'
import { z } from 'zod'

export type LoginDto = {
  taxId: string
  password: string
}

export type RegisterNewUserType = {
  confirmPassword: string
} & IUser

export const loginValidationSchema = z.object({
  taxId: z.string().min(1, 'Tax ID not provided'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
})

export const registerValidationSchema = loginValidationSchema
  .extend({
    firstName: z.string().min(1, 'Name is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  })
