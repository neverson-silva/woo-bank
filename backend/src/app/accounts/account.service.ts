import { Account, IAccount } from '@/app/accounts/account'
import { Transaction } from '@/app/transactions/transaction'
import { IUser } from '@/app/users/user'

const getAccountBalance = async (account: IAccount): Promise<number> => {
  const transactions = await Transaction.find({
    $or: [{ sender: account }, { receiver: account }],
  })
    .populate('sender', 'accountNumber')
    .populate('receiver', 'accountNumber')

  return transactions.reduce((acc, transaction) => {
    if (transaction.sender.accountNumber === account.accountNumber) {
      return Number(acc) - Number(transaction.value)
    } else {
      return Number(acc) + Number(transaction.value)
    }
  }, 0)
}

const getAccountDetails = async (
  accountNumber: string,
): Promise<{
  accountNumber: string
  user: IUser
  balance: number
} | null> => {
  const account = await Account.findOne({
    accountNumber,
  }).populate('user', 'id firstName')

  if (!account) {
    return null
  }

  const balance = await getAccountBalance(account)

  return {
    balance,
    accountNumber,
    user: account.user,
  }
}

const createAccount = async (user: IUser) => {
  const existentAccount = await Account.findOne({ userId: user.id })

  if (existentAccount) {
    return existentAccount
  }

  const account = new Account({
    accountNumber: Math.floor(100000 + Math.random() * 900000).toString(),
    user,
  })

  return await account.save()
}

export const AccountService = {
  getAccountDetails,
  getAccountBalance,
  createAccount,
}
