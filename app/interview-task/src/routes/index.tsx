import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
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

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Outlet />
    </div>
  )
}