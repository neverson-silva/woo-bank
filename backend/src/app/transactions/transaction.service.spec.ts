import { describe, it, expect, vi, afterEach } from 'vitest'
import mongoose from 'mongoose'

import * as uuid from 'uuid'
import { TransactionService } from './transaction.service'
import { SendTransactionType } from './types'
import { Account, User, Transaction } from '../models'

vi.mock('../models')
vi.mock('uuid')

describe('TransactionService', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('sendTransaction', () => {
    it('should throw an error if the receiver account is the same as the sender account', async () => {
      const sendTransactionInput: SendTransactionType = {
        value: 100,
        senderAccountNumber: 123456,
        receiverTaxId: '987654321',
        idempotencyKey: 'unique-key',
        userId: mongoose.Types.ObjectId.createFromTime(1),
      }

      const originAccount = { accountNumber: '123456', user: mongoose.Types.ObjectId.createFromTime(1) }
      const userDestination = { taxId: '987654321' }
      const destinationAccount = {
        accountNumber: '123456',
        user: mongoose.Types.ObjectId.createFromTime(2),
      }

      vi.spyOn(Account, 'findOne')
        .mockReturnValueOnce({
          populate: vi.fn().mockResolvedValue(originAccount),
        } as any)
        .mockReturnValueOnce({
          populate: vi.fn().mockResolvedValue(destinationAccount),
        } as any)

      vi.spyOn(User, 'findOne').mockReturnValueOnce(userDestination as any)

      await expect(TransactionService.sendTransaction(sendTransactionInput)).rejects.toThrow(
        'Receiver account must be different than sender account',
      )
    })

    it('should throw an error if either account is invalid', async () => {
      const sendTransactionInput: SendTransactionType = {
        value: 100,
        senderAccountNumber: 987654,
        receiverTaxId: '987654321',
        idempotencyKey: 'unique-key',
        userId: mongoose.Types.ObjectId.createFromTime(2),
      }

      vi.spyOn(Account, 'findOne').mockReturnValueOnce({
        populate: vi.fn().mockResolvedValue(null),
      } as any)

      vi.spyOn(Account, 'findOne').mockReturnValueOnce({
        populate: vi.fn().mockResolvedValue({ accountNumber: 999 } as any),
      } as any)

      await expect(TransactionService.sendTransaction(sendTransactionInput)).rejects.toThrow(
        'Invalid accounts',
      )
    })

    it('should return the existing transaction if idempotency key is found', async () => {
      const sendTransactionInput: SendTransactionType = {
        value: 100,
        senderAccountNumber: 123456,
        receiverTaxId: '987654321',
        idempotencyKey: 'unique-key',
        userId: mongoose.Types.ObjectId.createFromTime(1),
      }

      const originAccount = { accountNumber: '123456', user: 'user-id' }
      const userDestination = { taxId: '987654321' }
      const destinationAccount = { accountNumber: '654321', user: 'user-id' }
      const existentTransaction = { idempotencyKey: 'unique-key' }

      vi.spyOn(Account, 'findOne')
        .mockReturnValueOnce({
          populate: vi.fn().mockResolvedValue(originAccount),
        } as any)
        .mockReturnValueOnce({
          populate: vi.fn().mockResolvedValue(destinationAccount),
        } as any)

      vi.spyOn(User, 'findOne').mockResolvedValue(userDestination as any)

      vi.spyOn(Transaction, 'findOne').mockReturnValue({
        populate: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValueOnce(existentTransaction),
      } as any)

      const result = await TransactionService.sendTransaction(sendTransactionInput)
      expect(result).toEqual(existentTransaction)
    })

    it('should create and return a new transaction if idempotency key is not found', async () => {
      const sendTransactionInput: SendTransactionType = {
        value: 100,
        senderAccountNumber: 123456,
        receiverTaxId: '987654321',
        idempotencyKey: '',
        userId: mongoose.Types.ObjectId.createFromTime(1),
      }

      const originAccount = { accountNumber: '123456', user: 'user-id' }
      const userDestination = { taxId: '987654321' }
      const destinationAccount = { accountNumber: '654321', user: 'user-id' }
      const newTransaction = { idempotencyKey: 'new-idempotency-key' }

      vi.spyOn(Account, 'findOne')
        .mockReturnValueOnce({
          populate: vi.fn().mockResolvedValue(originAccount),
        } as any)
        .mockReturnValueOnce({
          populate: vi.fn().mockResolvedValue(destinationAccount),
        } as any)

      vi.spyOn(User, 'findOne').mockResolvedValue(userDestination as any)
      vi.spyOn(Transaction, 'findOne').mockReturnValue({
        populate: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(null),
      } as any)

      vi.spyOn(uuid, 'v4').mockReturnValue('new-idempotency-key')
      vi.spyOn(Transaction.prototype, 'save').mockResolvedValue(newTransaction as any)

      const result = await TransactionService.sendTransaction(sendTransactionInput)
      expect(result).toBeDefined()
    })
  })

  describe('getLastTransactions', () => {
    it('should return the last 5 transactions for a user', async () => {
      const userId = new mongoose.Types.ObjectId()
      const account = { accountNumber: '123456', user: userId }
      const transactions = [
        {
          sender: { accountNumber: '123456', user: { id: '1', firstName: 'John' } },
          receiver: { accountNumber: '654321', user: { id: '2', firstName: 'Jane' } },
          value: 100,
        },
        // Add more transactions if needed
      ]

      vi.spyOn(Account, 'findOne').mockResolvedValue(account as any)
      vi.spyOn(Transaction, 'find').mockReturnValue({
        populate: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(transactions),
      } as any)

      const result = await TransactionService.getLastTransactions(userId)
      expect(result).toEqual(transactions)
    })

    it('should return an empty array if no transactions are found', async () => {
      const userId = new mongoose.Types.ObjectId()
      const account = { accountNumber: '123456', user: userId }

      vi.spyOn(Account, 'findOne').mockResolvedValue(account as any)
      vi.spyOn(Transaction, 'find').mockReturnValue({
        populate: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([]),
      } as any)

      const result = await TransactionService.getLastTransactions(userId)
      expect(result).toEqual([])
    })
  })
})
