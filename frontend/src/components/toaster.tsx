import { ComponentProps } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import { tv } from 'tailwind-variants'

import { useDevice } from '@/hooks/useDevice'
import { cn } from '@/lib/utils'

import 'react-toastify/dist/ReactToastify.min.css'

const toaster = tv({
  slots: {
    toastClassName:
      'relative mx-4 my-4 md:mx-0 md:my-2 flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer',
    bodyClassName: 'text-sm font-white font-med block p-3 flex items-start justify-start flex-row',
    progressClassName: 'fancy-progress-bar ',
  },
  variants: {
    type: {
      success: {
        toastClassName: 'bg-emerald-100 dark:bg-emerald-700',
        bodyClassName:
          '[&>*:first-child]:[&>*:first-child]:fill-emerald-700  dark:[&>*:first-child]:[&>*:first-child]:fill-emerald-100 text-emerald-700 dark:text-emerald-100',
        progressClassName: 'bg-emerald-700 dark:bg-emerald-50 ',
      },
      error: {
        toastClassName: 'bg-red-100 dark:bg-red-700 text-amber-800',
        bodyClassName:
          '[&>*:last-child]:[&>*:last-child]:fill-red-700  [&>*:first-child]:[&>*:first-child]:fill-red-700  dark:[&>*:first-child]:[&>*:first-child]:fill-red-100 text-red-700 dark:text-red-200',
        progressClassName: 'bg-red-700 dark:bg-red-50 ',
      },
      info: {
        toastClassName: 'bg-sky-100 dark:bg-sky-700',
        bodyClassName:
          '[&>*:first-child]:[&>*:first-child]:fill-sky-700  dark:[&>*:first-child]:[&>*:first-child]:fill-sky-100 text-sky-700 dark:text-sky-100',
        progressClassName: 'bg-sky-700 dark:bg-sky-50 ',
      },
      warning: {
        toastClassName: 'bg-orange-100 dark:bg-orange-700',
        bodyClassName:
          '[&>*:first-child]:[&>*:first-child]:fill-orange-700  dark:[&>*:first-child]:[&>*:first-child]:fill-orange-100 text-orange-700 dark:text-orange-100',
        progressClassName: 'bg-orange-700 dark:bg-orange-50 ',
      },
      default: {
        toastClassName: '',
        bodyClassName: '',
      },
      dark: {
        toastClassName: '',
        bodyClassName: '',
      },
    },
  },
})
export const Toaster = (props: ComponentProps<typeof ToastContainer>) => {
  const { isMobile } = useDevice()

  const { toastClassName, bodyClassName, progressClassName } = toaster()
  return (
    <ToastContainer
      position={isMobile ? 'bottom-center' : 'top-right'}
      autoClose={1600}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={isMobile ? 4 : 6}
      transition={Bounce}
      progressClassName={(context) =>
        cn(context?.defaultClassName, progressClassName({ type: context?.type ?? 'default' }))
      }
      toastClassName={(context) =>
        cn(context?.defaultClassName, toastClassName({ type: context?.type ?? 'default' }))
      }
      bodyClassName={(context) =>
        cn(context?.defaultClassName, bodyClassName({ type: context?.type ?? 'default' }))
      }
      {...props}
    />
  )
}
