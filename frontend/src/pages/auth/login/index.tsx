import { Logo } from '@/components/logo'
import { RequiredMark } from '@/components/required-mark'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { isValidDocument } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/components/authentication-provider'
import { useState } from 'react'

import { useToast } from '@/hooks/useToast'

export const formLoginSchema = z.object({
  taxId: z
    .string()
    .min(1, 'Field is required')
    .regex(/^[0-9]*$/, 'Only numbers are allowed')
    .refine((doc) => isValidDocument(doc), 'Invalid document / username provided'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
})

export const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const { handleSubmit, control } = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      taxId: '',
      password: '',
    },
  })

  const { login } = useAuth()

  const handleOnEnter = async (data: z.infer<typeof formLoginSchema>) => {
    try {
      setLoading(true)
      await login(data.taxId, data.password)
      navigate('/home')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-md min-w-96 dark:bg-emerald-950 dark:border-none ">
      <CardHeader>
        <p className="mb-1 font-poppins flex flex-col content-center items-center justify-centertext-center text-sm">
          <Logo className="w-72 h-16 md:w-60 md:h-14 fill-emerald-400 dark:fill-white" />
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form
          control={control}
          className="flex flex-col gap-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(handleOnEnter)()
            }
          }}
        >
          <Form.Control
            label={
              <span>
                Username/Tax ID <RequiredMark />
              </span>
            }
            name="taxId"
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder={'08206604952'}
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
                Password <RequiredMark />
              </span>
            }
            name="password"
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="*************"
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
        <Button className="w-full" onClick={handleSubmit(handleOnEnter)} loading={loading}>
          Login
        </Button>
        <span className="font-sans text-xs">
          {` Don't have an account yet? `}
          <a
            href="#"
            className="text-emerald-800 dark:text-emerald-300"
            onClick={() => navigate('/register')}
          >
            Register
          </a>
        </span>
      </CardFooter>
    </Card>
  )
}
