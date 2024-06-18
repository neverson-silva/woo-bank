import { AccountService } from '@/app/accounts/account.service'
import { LoginDto, RegisterNewUserType } from '@/app/users/types'
import { AppException } from '@/infra/exceptions/app.exception'
import { PromiseReturnType } from '@/infra/types'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { User } from '@/app/users/user'
import { Account } from '@/app/accounts/account'

const expirationTime = 600000 // 10 minutos

export const generateAuthToken = (
  accountDetails: Partial<PromiseReturnType<typeof AccountService.getAccountDetails>>,
) => {
  const token = jwt.sign(
    {
      userId: accountDetails?.user?.id,
      firstName: accountDetails?.user?.firstName,
      account: { accountNumber: accountDetails?.accountNumber },
    },
    process.env.JWT_SECRET_KEY!.trim(),
    {
      expiresIn: expirationTime,
      subject: accountDetails?.user?.id,
      algorithm: 'HS256',
      issuer: 'https://woovi.com.br',
    },
  )

  return {
    token,
    expiresIn: expirationTime,
  }
}

export const login = async ({ taxId, password }: LoginDto) => {
  const user = await User.findOne({ taxId })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppException('User or password mismatch')
  }

  const account = await Account.findOne({
    user,
  })

  const response = generateAuthToken({
    accountNumber: account?.accountNumber,
    user,
  })
  return response
}

const register = async (user: RegisterNewUserType) => {
  const existentUser = await User.findOne({ taxId: user.taxId })

  if (existentUser) {
    throw new AppException('User already exists')
  }

  if (user.confirmPassword !== user.password) {
    throw new AppException('Confirmation password mismatch')
  }

  const newUser = await User.create(user)

  await AccountService.createAccount(newUser)

  const userAccount = await Account.findOne({
    user: newUser,
  }).populate('user')

  return generateAuthToken(userAccount)
}

export const UserService = {
  generateAuthToken,
  login,
  register,
}
