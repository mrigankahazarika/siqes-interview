import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { Dashboard } from '../../features/dashboard/view'
import { DashboardLayout } from '../../layouts/dahsboard.layout'

// const user = {
//   id : 1
// };

const user = null;


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
  // loader : ()=> {
  //   return user;
  // },
  // errorComponent : ({error}) => {
  //     const navigate = useNavigate()

  //      if (!user.id) {
  //       navigate({ to: "/login" });
  //     return;
  //   }
  // },
})

function RouteComponent() {
  return <div>
    <DashboardLayout/>
    <Outlet />
  </div>
}
