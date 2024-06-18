import { useAuth } from '@/components/authentication-provider'
import { DesktopSidebar } from '@/components/desktop-sidebar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useDevice } from '@/hooks/useDevice'
import { cn, welcomeUser } from '@/lib/utils'
import { Balance } from '@/pages/home/components/balance'
import { LastTransactions } from '@/pages/home/components/last-transactions'
import { QuickTransfer } from '@/pages/home/components/quick-transfer'
import dayjs from 'dayjs'
import { Loader2, LogOut } from 'lucide-react'
import { Suspense } from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const HomePage = () => {
  const { logout, user } = useAuth()

  const { isMobile } = useDevice()

  const mockData = [
    {
      name: dayjs().subtract(6, 'day').format('DD/MM'),
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: dayjs().subtract(5, 'day').format('DD/MM'),
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: dayjs().subtract(4, 'day').format('DD/MM'),
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: dayjs().subtract(3, 'day').format('DD/MM'),
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: dayjs().subtract(2, 'day').format('DD/MM'),
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: dayjs().subtract(1, 'day').format('DD/MM'),
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: dayjs().format('DD/MM'),
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  return (
    <Suspense fallback={<Loader2 className="animate animate-spin" />}>
      <div className={cn(!isMobile && 'flex flex-row')}>
        {!isMobile && <DesktopSidebar />}
        <div className={'w-full min-h-screen md:dark:bg-emerald-950 dark:bg-emerald-darkest p-4 '}>
          <div className={cn('mb-3', isMobile && 'flex justify-between items-center')}>
            <span className="font-poppins font-semibold">
              {welcomeUser()}, {user?.firstName}
            </span>
            {isMobile && (
              <Button variant="ghost" onClick={logout}>
                Logout <LogOut className="size-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 gap-6 mb-8">
            <div className="md:col-span-5 ">
              <Balance />
              {!isMobile && <QuickTransfer className="mt-4" />}
            </div>
            {isMobile && <QuickTransfer />}
            {!isMobile && (
              <div className="md:col-span-7">
                <Card className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={200}
                      height={100}
                      data={mockData}
                      margin={{
                        top: 60,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            )}
            {isMobile && (
              <div>
                <LastTransactions />
              </div>
            )}
          </div>
          {!isMobile && (
            <div>
              <LastTransactions />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}
