import { Account } from '@/app/accounts/account'
import { User } from '@/app/models'
import { Transaction } from '@/app/transactions/transaction'
import { SendTransactionType } from '@/app/transactions/types'
import { AppException } from '@/infra/exceptions/app.exception'
import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

export const sendTransaction = async ({
  value,
  senderAccountNumber,
  receiverTaxId,
  idempotencyKey,
  userId,
}: SendTransactionType) => {
  const originAccount = await Account.findOne({
    accountNumber: senderAccountNumber,
    user: userId,
  }).populate('user')

  const userDestination = await User.findOne({ taxId: receiverTaxId })

  const destinationAccount = await Account.findOne({ user: userDestination }).populate('user')

  if (originAccount?.accountNumber === destinationAccount?.accountNumber) {
    throw new AppException('Receiver account must be different than sender account')
  }

  if (!originAccount || !destinationAccount) {
    throw new AppException('Invalid accounts')
  }

  if (!idempotencyKey) {
    idempotencyKey = uuid()
  }

  const existentTransaction = await Transaction.findOne({ idempotencyKey })
    .populate('sender', 'accountNumber')
    .populate('receiver', 'accountNumber')

  if (existentTransaction) {
    return existentTransaction
  }

  const transaction = new Transaction({
    sender: originAccount,
    receiver: destinationAccount,
    value,
    idempotencyKey,
  })

  await transaction.save()

  return transaction
}

const getLastTransactions = async (userId: mongoose.Types.ObjectId) => {
  const account = await Account.findOne({
    user: userId,
  })

  return await Transaction.find({
    $or: [{ sender: account }, { receiver: account }],
  })
    .populate({
      path: 'sender',
      populate: {
        path: 'user',
        model: 'users',
        strictPopulate: false,
      },
    })
    .populate({
      path: 'receiver',
      populate: {
        path: 'user',
        model: 'users',
        strictPopulate: false,
      },
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .exec()
}

export const TransactionService = {
  sendTransaction,
  getLastTransactions,
}
