import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { DesktopSidebar } from '@/components/desktop-sidebar.tsx'
import { MockAuthProvider } from '@/stories/mock-auth-provider.tsx'
import { LastTransactions } from '@/pages/home/components/last-transactions'

const mockTransactions = [
  {
    id: '1',
    value: 100,
    receiver: { accountNumber: '1234', user: { firstName: 'John' } },
    sender: { accountNumber: '5678', user: { firstName: 'Jane' } },
    createdAt: '1624113600000', // Sample timestamp
  },
  {
    id: '2',
    value: 200,
    receiver: { accountNumber: '5678', user: { firstName: 'Jane' } },
    sender: { accountNumber: '1234', user: { firstName: 'John' } },
    createdAt: '1624200000000', // Another sample timestamp
  },
  {
    id: '3',
    value: 150,
    receiver: { accountNumber: '5678', user: { firstName: 'Jane' } },
    sender: { accountNumber: '1234', user: { firstName: 'John' } },
    createdAt: '1624286400000', // Another sample timestamp
  },
  {
    id: '4',
    value: 300,
    receiver: { accountNumber: '1234', user: { firstName: 'John' } },
    sender: { accountNumber: '5678', user: { firstName: 'Jane' } },
    createdAt: '1624372800000', // Another sample timestamp
  },
  // Add more mock transactions as needed
]

const meta = {
  title: 'Dashboard Page/Last Transactions',
  component: DesktopSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  render: () => (
    <MockAuthProvider>
      <div className="w-full">
        <LastTransactions userTransactions={mockTransactions as any} />
      </div>
    </MockAuthProvider>
  ),
} satisfies Meta<typeof DesktopSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
