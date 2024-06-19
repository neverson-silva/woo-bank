import { describe, it, expect, vi, afterEach } from 'vitest'
import { IAccount, Account } from './account'
import { Transaction } from './../transactions/transaction'
import { AccountService } from './account.service'
import { IUser } from './../users/user'

vi.mock('./account')
vi.mock('./../transactions/transaction')
vi.mock('./../users/user')

describe('AccountService', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  describe('getAccountBalance', () => {
    it('should return the correct balance when there are transactions', async () => {
      const account: IAccount = { accountNumber: '123456', userId: '1' } as unknown as IAccount
      const transactions = [
        { sender: { accountNumber: '123456' }, receiver: { accountNumber: '654321' }, value: 100 },
        { sender: { accountNumber: '654321' }, receiver: { accountNumber: '123456' }, value: 200 },
      ]

      vi.spyOn(Transaction, 'find').mockReturnValueOnce({
        populate: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(transactions),
      } as any)

      const balance = await AccountService.getAccountBalance(account)
      expect(balance).toBe(100) // -100 (outgoing) + 200 (incoming)
    })

    it('should return 0 when there are no transactions', async () => {
      const account: IAccount = { accountNumber: '123456', userId: '1' } as unknown as IAccount

      vi.spyOn(Transaction, 'find').mockReturnValueOnce({
        populate: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([]),
      } as any)

      const balance = await AccountService.getAccountBalance(account)
      expect(balance).toBe(0)
    })
  })

  describe('getAccountDetails', () => {
    it('should return account details when the account exists', async () => {
      const account = {
        accountNumber: '123456',
        user: { id: '1', firstName: 'John' },
      } as unknown as IAccount

      const accountQuery = {
        populate: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(account),
      }

      const transactionQuery = {
        populate: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([
          {
            id: '2222',
            sender: { ...account, accountNumber: '12348856' },
            receiver: account,
            value: 1000,
          } as any,
        ]),
      }

      vi.spyOn(Account, 'findOne').mockReturnValue(accountQuery as any)
      vi.spyOn(Transaction, 'find').mockReturnValue(transactionQuery as any)

      const result = await AccountService.getAccountDetails('123456')
      expect(result).toEqual({
        accountNumber: '123456',
        user: { id: '1', firstName: 'John' },
        balance: 1000,
      })
    })

    it('should return null when the account does not exist', async () => {
      const accountQuery = {
        populate: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(null),
      }

      vi.spyOn(Account, 'findOne').mockReturnValue(accountQuery as any)

      const result = await AccountService.getAccountDetails('123456')
      expect(result).toBeNull()
    })
  })

  describe('createAccount', () => {
    it('should create a new account when the user does not have one', async () => {
      const user: IUser = { id: '1', firstName: 'John', lastName: 'Doe' } as unknown as IUser
      const newAccount = { accountNumber: '654321', user } as IAccount

      vi.spyOn(Account, 'findOne').mockResolvedValueOnce(null)
      vi.spyOn(Account.prototype, 'save').mockResolvedValueOnce(newAccount as any)

      const result = await AccountService.createAccount(user)
      expect(result).toEqual(newAccount)
    })

    it('should return existing account when the user already has one', async () => {
      const user: IUser = { id: '1', firstName: 'John', lastName: 'Doe' } as unknown as IUser
      const existentAccount = { accountNumber: '123456', user } as IAccount

      vi.spyOn(Account, 'findOne').mockResolvedValueOnce(existentAccount)

      const result = await AccountService.createAccount(user)
      expect(result).toEqual(existentAccount)
    })
  })
})
