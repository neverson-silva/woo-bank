import { useAuth } from '@/components/authentication-provider'
import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const DesktopSidebar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className=" flex flex-col w-[17.5rem] min-h-screen bg-emerald-500 dark:bg-emerald-darkest ">
      <div className="flex justify-center -m-7">
        <Logo className="size-32 fill-white dark:fill-emerald-50" />
      </div>
      <div className="flex flex-row px-4 gap-4 items-center">
        <div>
          <Avatar className="size-[4rem] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 flex flex-col">
          <span
            className="text-lg font-normal text-white
            "
          >
            {user?.firstName}
          </span>
          <a href="#" className="text-sm text-white hover:text-emerald-200" onClick={logout}>
            Logout
          </a>
        </div>
      </div>
      <ul className="pt-4 gap-1 flex flex-col mx-2">
        <ol className="py-1  text-white hover:bg-emerald-700 pl-2 rounded">
          <span>Dashboard</span>
        </ol>
        <ol className="py-1 px-4 text-white hover:bg-emerald-700 pl-2 rounded">Settings</ol>
        <ol className="py-1  px-4 text-white hover:bg-emerald-700 pl-2 rounded">Profile</ol>
      </ul>
    </nav>
  )
}
