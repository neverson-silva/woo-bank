import { Logo } from '@/components/logo'
import { RequiredMark } from '@/components/required-mark'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { formLoginSchema } from './../login/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAuth } from '@/components/authentication-provider'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'

const registerFormSchema = formLoginSchema
  .extend({
    firstName: z.string().min(1, 'Name is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  })

export type RegisterForm = z.infer<typeof registerFormSchema>

export const RegisterPage = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { handleSubmit, control } = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      taxId: '',
      password: '',
      confirmPassword: '',
      firstName: '',
    },
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const handleOnRegister = async (data: RegisterForm) => {
    try {
      setLoading(true)
      await register(data)
      navigate('/home')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card className="rounded-md min-w-96 dark:bg-emerald-950 dark:border-none ">
      <CardHeader>
        <p className="mb-1 font-poppins flex flex-col content-center items-center justify-centertext-center text-sm">
          <Logo className="w-72 h-16 md:w-60 md:h-14 fill-emerald-400 dark:fill-white" />
          register
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form
          control={control}
          className="flex flex-col gap-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(handleOnRegister)()
            }
          }}
        >
          <Form.Control
            label={
              <span>
                First name <RequiredMark />
              </span>
            }
            name="firstName"
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder={'John'}
                  {...field}
                  invalid={fieldState.invalid}
                  disabled={false}
                  className="mt-2"
                />
              )
            }}
          />
          <Form.Control
            label={
              <span>
                Tax ID <RequiredMark />
              </span>
            }
            name="taxId"
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="082066456211"
                  {...field}
                  invalid={fieldState.invalid}
                  disabled={false}
                  className="mt-2 mb-2"
                />
              )
            }}
          />
          <Form.Control
            label={
              <span>
                Password <RequiredMark />
              </span>
            }
            name="password"
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="****************"
                  {...field}
                  invalid={fieldState.invalid}
                  disabled={false}
                  className="mt-2 mb-2"
                  password
                />
              )
            }}
          />
          <Form.Control
            label={
              <span>
                Confirm your password <RequiredMark />
              </span>
            }
            name="confirmPassword"
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="****************"
                  {...field}
                  invalid={fieldState.invalid}
                  disabled={false}
                  className="mt-2 mb-2"
                  password
                />
              )
            }}
          />
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleSubmit(handleOnRegister)} loading={loading}>
          Register
        </Button>
        <Button className="w-full" variant="link" onClick={() => navigate('/login')}>
          Back
        </Button>
      </CardFooter>
    </Card>
  )
}
