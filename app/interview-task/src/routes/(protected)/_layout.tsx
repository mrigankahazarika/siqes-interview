import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Sidebar } from '../../components/global/sidebar';

export const Route = createFileRoute('/(protected)/_layout')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    // If no user, throw a redirect immediately
    if (!context.auth.user) {
      throw redirect({
        to: '/login',
        search: {
          // Optional: remember where they were trying to go
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  return <div>
    <div className="flex  flex-row h-[100vh] p-1">
      <Sidebar />
      <Outlet />
    </div>
  </div>
}
