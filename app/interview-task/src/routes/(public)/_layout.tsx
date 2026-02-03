import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Outlet /> </div>
}
