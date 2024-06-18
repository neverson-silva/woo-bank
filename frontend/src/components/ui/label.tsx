import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const labelVariants = tv({
  base: 'text-sm md:text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
})

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
