import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { DesktopSidebar } from '@/components/desktop-sidebar.tsx'
import { MockAuthProvider } from '@/stories/mock-auth-provider.tsx'

const meta = {
  title: 'Components/Desktop Sidebar',
  component: DesktopSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
  render: () => (
    <MockAuthProvider>
      <DesktopSidebar />
    </MockAuthProvider>
  ),
} satisfies Meta<typeof DesktopSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
