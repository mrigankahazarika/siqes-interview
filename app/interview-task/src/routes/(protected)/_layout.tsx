import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/_layout')({
  component: RouteComponent,
  beforeLoad : ({})=> {
        redirect({
          to : '/login'
        })
  }
})

function RouteComponent() {
  return <div>Hello "/(protected)/service index"!

    <Outlet />
  </div>
}
