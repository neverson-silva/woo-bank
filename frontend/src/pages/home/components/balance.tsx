import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { cn, formatDollarMoney } from '@/lib/utils'

type BalanceProps = {
  accountDetails: { balance: number }
}

export const Balance = ({ accountDetails }: BalanceProps) => {
  return (
    <Card>
      <CardHeader className="text-lg font-sans font-bold mb-2 pb-0 dark:text-emerald-900">
        Balance
      </CardHeader>
      <CardContent className="flex flex-col gap-2 mb-0 pb-2 dark:text-emerald-900">
        <Text
          className={cn(
            'text-3xl font-sans font-bold md:my-2 dark:text-emerald-900',
            accountDetails?.balance < 0 && 'text-red-500',
          )}
        >
          {formatDollarMoney(accountDetails?.balance ?? 0)}
        </Text>
        <Text className="font-normal text-md dark:text-emerald-900">Available</Text>
      </CardContent>
    </Card>
  )
}
