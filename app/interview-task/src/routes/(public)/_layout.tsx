import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (context.auth.user) {
      throw redirect({
        to: '/',
      })
    }
  },
})

function RouteComponent() {
  return <div><Outlet /> </div>
}
