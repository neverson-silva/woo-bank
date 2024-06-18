import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type TextProps = ComponentProps<'span'>

export const Text: React.FC<TextProps> = (props) => (
  <span {...props} className={cn('text-base font-sans dark:text-white', props.className)} />
)
