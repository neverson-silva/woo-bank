import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SendHorizonal } from 'lucide-react'
import React, { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/components/authentication-provider'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn, convertMoneyToCents, extractGraphQLErrors, isValidDocument } from '@/lib/utils'
import { useToast } from '@/hooks/useToast'
import { useMutation } from 'react-relay'
import { SendTransactionMutation } from '@/graphql/mutations/sendTransactionMutation'
import { v4 as uuid } from 'uuid'
import { useDashboardStore } from '@/hooks/useDashboardStore'

type QuickTransferProps = ComponentProps<typeof Card>

const quickTransferSchema = z.object({
  receiver: z
    .string()
    .min(1, 'Receiver TAX ID is required')
    .regex(/^[0-9]*$/, 'Only numbers are allowed')
    .refine((doc) => isValidDocument(doc), 'Receiver tax id / document is invalid'),
  value: z.coerce.string().min(1, 'Transfer value is required'),
})

type QuickTransferType = z.infer<typeof quickTransferSchema>

export const QuickTransfer: React.FC<QuickTransferProps> = (props) => {
  const { user } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const toggleUpdateAll = useDashboardStore((state) => state.toggleUpdateAll)

  const [sendTransactionMutation, isSendingTransaction] = useMutation(SendTransactionMutation)

  const toast = useToast()

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(quickTransferSchema),
    defaultValues: {
      sender: user?.account?.accountNumber ?? '',
      receiver: '',
      value: '',
    },
  })

  const handleTransfer = async (data: QuickTransferType) => {
    try {
      setLoading(true)

      const payload = {
        receiverTaxId: data.receiver,
        senderAccountNumber: String(user?.account?.accountNumber),
        value: convertMoneyToCents(data.value),
        idempotencyKey: uuid(),
      }

      await sendTransactionMutation({
        variables: payload,
        onCompleted: () => {
          toast.success('Transfer successful')
          reset()
          toggleUpdateAll()
        },
        onError: (err) => {
          toast.error(extractGraphQLErrors(err))
          setLoading(false)
          reset()
        },
      })
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader className="text-lg font-sans font-bold mb-2 pb-0 dark:text-emerald-900">
        Quick Transfer
      </CardHeader>
      <CardContent className={cn('flex flex-col  pb-2 mt-4 mb-4')}>
        <Form
          control={control}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(handleTransfer)()
            }
          }}
          className="flex flex-col gap-2"
        >
          <Form.Control
            name="receiver"
            label={<Text className="text-sm dark:text-emerald-900">Receiver Tax ID</Text>}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder={'08206604952'}
                  {...field}
                  invalid={fieldState.invalid}
                  disabled={false}
                  className="mt-2 dark:text-red-400 "
                />
              )
            }}
          />
          <Form.Control
            name="value"
            label={<Text className="text-sm dark:text-emerald-900">Amount</Text>}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder={'$ 12.00'}
                  {...field}
                  invalid={fieldState.invalid}
                  disabled={false}
                  className="mt-2"
                  type="number"
                />
              )
            }}
          />
        </Form>
        <Button
          className="mt-4 gap-3 "
          loading={loading || isSendingTransaction}
          onClick={handleSubmit(handleTransfer)}
        >
          Transfer
          {!(loading || isSendingTransaction) && <SendHorizonal className="size-4" />}
        </Button>
      </CardContent>
    </Card>
  )
}
