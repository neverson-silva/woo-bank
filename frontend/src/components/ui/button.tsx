import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { tv, VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = tv({
  slots: {
    root: 'inline-flex items-center justify-center whitespace-nowrap gap-1  rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    icon: '',
  },
  variants: {
    loading: {
      true: {
        root: 'opacity-45 cursor-not-allowed',
      },
    },
    variant: {
      default: {
        root: 'bg-[#003e2d] dark:text-white dark:bg-emerald-700 dark:hover:bg-emerald-800 text-primary-foreground shadow hover:bg-[#003e2d]/90',
      },
      destructive: {
        root: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      },
      outline: {
        root: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      secondary: {
        root: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      },
      ghost: {
        root: 'hover:bg-accent hover:text-accent-foreground',
      },
      link: {
        root: 'text-primary underline-offset-4 hover:underline',
      },
    },
    size: {
      default: {
        root: 'h-9 px-4 py-2',
        icon: 'size-5',
      },
      sm: {
        root: 'h-8 rounded-md px-3 text-xs',
        icon: 'size-4',
      },
      lg: {
        root: 'h-10 rounded-md px-8',
        icon: 'size-6',
      },
      icon: {
        root: 'h-9 w-9',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const { root, icon } = buttonVariants({ variant, size, className, loading })
    return (
      <Comp className={cn(root(), className)} ref={ref} {...props} disabled={disabled ?? loading}>
        {loading && <Loader2 className={cn(icon(), 'animate animate-spin')} />}
        {children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
