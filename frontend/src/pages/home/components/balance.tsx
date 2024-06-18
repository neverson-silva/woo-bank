import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { AccountDetailsQuery } from '@/graphql/queries/accountDetailsQuery'
import { useDashboardStore } from '@/hooks/useDashboardStore'
import { cn, formatDollarMoney } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { useLazyLoadQuery } from 'react-relay'

export const Balance = () => {
  const updateAll = useDashboardStore((state) => state.updateAll)
  const { accountDetails } = useLazyLoadQuery(
    AccountDetailsQuery,
    {},
    { fetchPolicy: 'network-only', fetchKey: updateAll.toString() },
  ) as any

  return (
    <Suspense fallback={<Loader2 className="animate animate-spin" />}>
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
    </Suspense>
  )
}
