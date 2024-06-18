import { AuthProvider } from '@/components/authentication-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/toaster'
import { Outlet } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay'
import { environment } from '@/graphql/relay/envinroment'

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider>
        <AuthProvider>
          <main className="min-h-screen flex flex-col antialiased">
            <Outlet />
            <Toaster />
          </main>
        </AuthProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  )
}

export default App
