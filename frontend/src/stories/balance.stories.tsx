import type { Meta, StoryObj } from '@storybook/react'
import { Balance } from '@/pages/home/components/balance.tsx'

const meta = {
  title: 'Dashboard Page/Balance',
  component: Balance,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Balance>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    accountDetails: {
      balance: 1225,
    },
  },
}
