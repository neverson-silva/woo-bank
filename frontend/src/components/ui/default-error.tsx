import { AlertTriangle } from 'lucide-react'

export const DefaultError = () => {
  return (
    <div className="flex h-[100vh] w-full flex-1  flex-col bg-emerald-900 text-white justify-center items-center">
      <div className="text-center flex gap-3 flex-col items-center">
        <AlertTriangle className="size-20" />
        <h1 className="text-4xl">Something went wrong!</h1>
        <p>
          <span className="text-xl">Please try again later</span>
        </p>
      </div>
    </div>
  )
}
