import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(protected)/_layout/service/_layout/$serviceId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/_layout/service/_layout/$serviceId/"!</div>
}
