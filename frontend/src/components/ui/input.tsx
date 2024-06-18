import * as React from 'react'

import { cn } from '@/lib/utils'
import { tv } from 'tailwind-variants'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
  password?: boolean
}

const inputClassNames = tv({
  slots: {
    root: 'group flex h-9 w-full items-center content-center rounded-md border border-slate-400 bg-transparent py-0 px-3 ',
    input:
      'h-full dark:text-muted placeholder:translate-y-[0.1rem]  py-1 flex placeholder:mt-9 flex-1 bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50',
    icon: 'size-[1.10rem] cursor-pointer text-slate-600',
  },
  variants: {
    invalid: {
      true: {
        input: 'border-red-500',
      },
    },
    focus: {
      true: {
        root: 'ring-1 ring-[#027857]',
        input: 'outline-none',
      },
    },
  },
})
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, password, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(password ? 'password' : type ?? 'text')
    const [focus, setFocus] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false)

    const { root, input, icon } = inputClassNames({ invalid, focus })

    const handleChangeVisibility = (visible: boolean) => {
      setInputType(password && visible ? type ?? 'text' : 'password')
      setIsVisible(visible)
    }

    const handleOnBlur = (ev: any) => {
      setFocus(false)
      props.onBlur?.(ev)
    }

    const handleOnFocus = (ev: any) => {
      setFocus(true)
      props.onFocus?.(ev)
    }

    return (
      <div className={root()}>
        <input
          type={inputType}
          ref={ref}
          {...props}
          className={input()}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {password && (
          <>
            {isVisible ? (
              <Eye className={icon()} onClick={() => handleChangeVisibility(!isVisible)} />
            ) : (
              <EyeOff className={icon()} onClick={() => handleChangeVisibility(!isVisible)} />
            )}
          </>
        )}
      </div>
    )

    return (
      <input
        type={inputType}
        className={cn(
          'flex h-9 w-full rounded-md border border-slate-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#027857] disabled:cursor-not-allowed disabled:opacity-50',
          className,
          invalid && 'border-red-500',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
