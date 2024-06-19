import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { PromiseReturnType } from '../../infra/types'
import { AccountService } from '../accounts/account.service'
import { UserService } from './user.service'
import { LoginDto, RegisterNewUserType } from './types'
import { User } from './user'
import { Account } from '../models'
import mongoose from 'mongoose'

vi.mock('jsonwebtoken', () => ({
  sign: vi.fn(),
}))
vi.mock('bcrypt')
vi.mock('./user')
vi.mock('../models')
vi.mock('../accounts/account.service')

describe('UserService', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules() // This is important to clear the cache between tests
    process.env = { ...originalEnv, JWT_SECRET_KEY: 'test-secret-key' }
  })
  afterEach(() => {
    vi.clearAllMocks()
    process.env = originalEnv
  })

  describe('generateAuthToken', () => {
    it('should generate a valid JWT token', () => {
      const accountDetails: Partial<PromiseReturnType<typeof AccountService.getAccountDetails>> = {
        accountNumber: '123456',
        user: { id: mongoose.Types.ObjectId.createFromTime(1), firstName: 'John' } as any,
      }
      const expectedToken = 'jwt-token'

      vi.spyOn(jwt, 'sign').mockReturnValue(expectedToken as any)

      const result = UserService.generateAuthToken(accountDetails)
      expect(result).toEqual({
        token: expectedToken,
        expiresIn: 600000,
      })
    })
  })

  describe('login', () => {
    it('should throw an error if user or password mismatch', async () => {
      const loginDto: LoginDto = { taxId: '123456789', password: 'password' }

      vi.spyOn(User, 'findOne').mockResolvedValue(null)

      await expect(UserService.login(loginDto)).rejects.toThrow('User or password mismatch')
    })

    it('should return a valid token if credentials are correct', async () => {
      const loginDto: LoginDto = { taxId: '123456789', password: 'password' }
      const user = { id: 'user-id', taxId: '123456789', password: 'hashed-password' }
      const account = { accountNumber: '123456', user }
      const expectedToken = 'jwt-token'

      vi.spyOn(User, 'findOne').mockResolvedValue(user as any)
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(true as any)
      vi.spyOn(Account, 'findOne').mockResolvedValue(account as any)
      vi.spyOn(jwt, 'sign').mockReturnValue(expectedToken as any)

      const result = await UserService.login(loginDto)
      expect(result).toEqual({
        token: expectedToken,
        expiresIn: 600000,
      })
    })
  })

  describe('register', () => {
    it('should throw an error if user already exists', async () => {
      const newUser: RegisterNewUserType = {
        taxId: '123456789',
        password: 'password',
        confirmPassword: 'password',
      } as any

      vi.spyOn(User, 'findOne').mockResolvedValue(newUser as any)

      await expect(UserService.register(newUser)).rejects.toThrow('User already exists')
    })

    it('should throw an error if password confirmation does not match', async () => {
      const newUser: RegisterNewUserType = {
        taxId: '123456789',
        password: 'password',
        confirmPassword: 'wrong-password',
      } as unknown as any

      vi.spyOn(User, 'findOne').mockResolvedValue(null)

      await expect(UserService.register(newUser)).rejects.toThrow('Confirmation password mismatch')
    })

    it('should create a new user and return a valid token', async () => {
      const newUser: RegisterNewUserType = {
        taxId: '123456789',
        password: 'password',
        confirmPassword: 'password',
      } as RegisterNewUserType
      const createdUser = { id: 'user-id', taxId: '123456789' }
      const newAccount = { accountNumber: '123456', user: createdUser }
      const expectedToken = 'jwt-token'

      vi.spyOn(User, 'findOne').mockResolvedValue(null)
      vi.spyOn(User, 'create').mockResolvedValue(createdUser as any)
      vi.spyOn(AccountService, 'createAccount').mockResolvedValue(newAccount as any)
      vi.spyOn(Account, 'findOne').mockReturnValueOnce({
        populate: vi.fn().mockResolvedValueOnce(newAccount as any),
      } as any)
      vi.spyOn(jwt, 'sign').mockReturnValue(expectedToken as any)

      const result = await UserService.register(newUser)
      expect(result).toEqual({
        token: expectedToken,
        expiresIn: 600000,
      })
    })
  })
})
