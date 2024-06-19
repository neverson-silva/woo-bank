import { LoginMutation } from '@/graphql/mutations/loginMutation'
import { RegisterForm } from '@/pages/auth/register'
import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-relay'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { extractGraphQLErrors } from '@/lib/utils'
import { RegisterMutation } from '@/graphql/mutations/registerMutation'

export interface IUser {
  id: string
  firstName: string
  account: { accountNumber: string }
}
interface AuthContextType {
  user: IUser | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  register(params: RegisterForm): Promise<void>
}

const PUBLIC_PAGES = ['/register', '/login']

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loginMutation] = useMutation(LoginMutation)
  const [registerMutation] = useMutation(RegisterMutation)

  const location = useLocation()
  const navigate = useNavigate()
  const [query] = useSearchParams()

  const handleAfterLogin = (token: string, expiresIn: number) => {
    const decodedUser = jwtDecode(token) as any

    setUser(decodedUser)

    localStorage.setItem('USER', JSON.stringify(decodedUser))

    localStorage.setItem('TOKEN', token)

    localStorage.setItem('EXPIRES', dayjs().add(expiresIn, 'millisecond').toISOString())
  }

  const login = async (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      loginMutation({
        variables: {
          password,
          taxId: username,
        },
        onCompleted: ({ login: { token, expiresIn } }: any) => {
          handleAfterLogin(token, expiresIn)
          resolve(null)
        },
        onError: (err) => {
          reject(new Error(extractGraphQLErrors(err)))
        },
      })
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  const register = async (params: RegisterForm) => {
    return new Promise((resolve, reject) => {
      registerMutation({
        variables: params,
        onCompleted: ({ register: { token, expiresIn } }: any) => {
          handleAfterLogin(token, expiresIn)
          resolve(null)
        },
        onError: (err) => reject(new Error(extractGraphQLErrors(err))),
      })
    })
  }

  const isAuthenticated = useMemo(() => !!user, [user])

  useEffect(() => {
    if (!isAuthenticated && !PUBLIC_PAGES.includes(location.pathname)) {
      navigate('/login', { replace: true })
    }
  }, [location, isAuthenticated])

  useEffect(() => {
    if (user) {
      return
    }
    try {
      const expirationDate = localStorage.getItem('EXPIRES') && dayjs(localStorage.getItem('EXPIRES'))

      if (expirationDate && expirationDate.isBefore(dayjs())) {
        return logout()
      }

      const user = JSON.parse(localStorage.getItem('USER') ?? '')

      setUser(user)

      const searchparams = `${
        query.size > 0
          ? `?${Array.from(query.entries())
              .map(([key, value]) => `${key}=${value}`)
              .join('&')}`
          : ''
      }`

      navigate(`/home${searchparams}`)
    } catch (e) {
      logout()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, login: login as any, logout, isAuthenticated, register: register as any }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
