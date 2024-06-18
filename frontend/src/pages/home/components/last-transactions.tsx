import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn, formatDollarMoney } from '@/lib/utils'
import { useLazyLoadQuery } from 'react-relay'
import { GetUserTransactionsQuery } from '@/graphql/queries/getUserTransactionsQuery'
import { useDashboardStore } from '@/hooks/useDashboardStore'
import { useAuth } from '@/components/authentication-provider'
import dayjs from 'dayjs'

export type Payment = {
  id: string
  amount: number
  receiver: string
  sender: string
  type: 'Credit' | 'Debit'
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    accessorKey: 'sender',
    header: 'Sender',
  },
  {
    accessorKey: 'receiver',
    header: 'Receiver',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const value = getValue() as any

      const isCredit = value === 'Credit'
      return (
        <span
          className={cn(
            'text-white text-xs py-1 px-2 rounded-full',
            isCredit ? 'bg-green-500' : 'bg-red-500',
          )}
        >
          {value}
        </span>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    accessorFn: ({ amount }) => formatDollarMoney(amount),
  },
]

export const LastTransactions = () => {
  const updateAll = useDashboardStore((state) => state.updateAll)
  const { user } = useAuth()

  // @ts-expect-error error is expected
  const { getUserTransactions: userTransactions } = useLazyLoadQuery(
    GetUserTransactionsQuery,
    {},
    {
      fetchPolicy: 'network-only',
      fetchKey: `get-transactions-${updateAll.toString()}`,
    },
  )

  const table = useReactTable({
    data: userTransactions?.map((transaction: any) => ({
      id: transaction?.id,
      amount: transaction?.value,
      receiver: transaction?.receiver?.user?.firstName,
      sender: transaction?.sender?.user?.firstName,
      createdAt: dayjs(Number(transaction?.createdAt)).format('DD/MM/YYYY HH:mm:ss'),
      type:
        String(transaction?.sender?.accountNumber) === String(user?.account?.accountNumber)
          ? 'Debit'
          : 'Credit',
    })),
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader className="dark:text-black font-semibold">Last transactions</CardHeader>
        <CardContent className="  w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="dark:text-emerald-900">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
