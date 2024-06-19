import type { Meta, StoryObj } from '@storybook/react'
import { DesktopSidebar } from '@/components/desktop-sidebar.tsx'
import { MockAuthProvider } from '@/stories/mock-auth-provider.tsx'
import { QuickTransfer } from '@/pages/home/components/quick-transfer'
import { RelayEnvironmentProvider } from 'react-relay'

const meta = {
  title: 'Dashboard Page/Quick Transfers',
  component: QuickTransfer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  render: () => (
    <RelayEnvironmentProvider environment={{} as any}>
      <MockAuthProvider>
        <div className="w-full">
          <QuickTransfer />
        </div>
      </MockAuthProvider>
    </RelayEnvironmentProvider>
  ),
} satisfies Meta<typeof DesktopSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
