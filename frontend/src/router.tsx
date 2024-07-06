import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { LoginPage } from '@/pages/auth/login'
import { AuthLayout } from './pages/auth'
import { RegisterPage } from './pages/auth/register'
import { HomePage } from '@/pages/home'
import { DefaultError } from '@/components/ui/default-error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <DefaultError />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
])
