import mongoose from 'mongoose'
import z from 'zod'

export type SendTransactionType = {
  senderAccountNumber: number
  receiverTaxId: string
  value: number
  idempotencyKey?: string
  userId: mongoose.Types.ObjectId
}

export const sendTransactionValidationSchema = z.object({
  senderAccountNumber: z.string().min(1, 'Sender account is required'),
  receiverTaxId: z.string().min(1, 'Receiver tax is required'),
  value: z.number({ required_error: 'Transaction value not provided' }),
  idempotencyKey: z.string(),
})
