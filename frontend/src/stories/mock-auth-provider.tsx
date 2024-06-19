import { PropsWithChildren } from 'react'
import { AuthContext } from '@/components/authentication-provider.tsx'

const mockAuthContextValue = {
  user: { firstName: 'John', lastName: 'Doe' },
  logout: () => alert('Logout clicked!'),
} as any

export const MockAuthProvider = ({ children }: PropsWithChildren) => {
  return <AuthContext.Provider value={mockAuthContextValue}>{children}</AuthContext.Provider>
}
