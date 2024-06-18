import { AccountService } from '@/app/accounts/account.service'
import { User } from '@/app/models'
import { TransactionService } from '@/app/transactions/transaction.service'
import { SendTransactionType, sendTransactionValidationSchema } from '@/app/transactions/types'
import { RegisterNewUserType, loginValidationSchema, registerValidationSchema } from '@/app/users/types'
import { UserService } from '@/app/users/user.service'
import { validatePayload } from '@/lib/utils'
import { z } from 'zod'

export const resolvers = {
  Query: {
    user: async (_: unknown, { id }: { id: string }) => await User.findById(id),
    accountDetails: async (parent: unknown, args: any, ctx: any) => {
      if (!ctx.jwt) {
        return null
      }
      return await AccountService.getAccountDetails(ctx.jwt.account.accountNumber)
    },
    getUserTransactions: async (parent: unknown, _args: any, ctx: any) => {
      if (!ctx.jwt) {
        return null
      }
      const transacoes = await TransactionService.getLastTransactions(ctx.jwt.userId)

      return transacoes
    },
  },
  Mutation: {
    login: async (parent: unknown, args: z.infer<typeof loginValidationSchema>) => {
      const params = await validatePayload(args, loginValidationSchema)
      return await UserService.login(params)
    },
    register: async (parent: unknown, args: z.infer<typeof registerValidationSchema>) => {
      const params = await validatePayload<RegisterNewUserType>(args, registerValidationSchema)
      return await UserService.register(params)
    },
    sendTransaction: async (
      parent: unknown,
      args: z.infer<typeof sendTransactionValidationSchema>,
      ctx: any,
    ) => {
      if (!ctx.jwt) {
        return null
      }
      const params = await validatePayload<SendTransactionType>(args, sendTransactionValidationSchema)
      return await TransactionService.sendTransaction({ ...params, userId: ctx.jwt.userId })
    },
  },
}
