import mongoose, { Document, Schema } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export interface IUser extends Document {
  firstName: string
  taxId: string
  password: string
}

export interface IAccount extends Document {
  accountNumber: string
  user: IUser
}

export interface ITransaction extends Document {
  sender: IAccount
  receiver: IAccount
  value: number
  idempotencyKey: string
  hash: string
  createdAt: Date
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  taxId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const AccountSchema: Schema = new Schema({
  accountNumber: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
})

const TransactionSchema: Schema = new Schema({
  value: { type: Number, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'accounts', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'accounts', required: true },
  idempotencyKey: { type: String, default: () => uuid() },
  hash: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.model<IUser>('users', UserSchema)
export const Account = mongoose.model<IAccount>('accounts', AccountSchema)
export const Transaction = mongoose.model<ITransaction>('transactions', TransactionSchema)
