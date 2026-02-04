import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/_layout/dashboard/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/_layout/dashboard/_layout"!</div>
}
