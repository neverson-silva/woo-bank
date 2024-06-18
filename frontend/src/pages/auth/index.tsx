import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="flex bg-cover flex-1 bg-auth ">
      <div className="flex flex-1  justify-center content-center items-center">
        <Outlet />
      </div>
    </div>
  )
}
