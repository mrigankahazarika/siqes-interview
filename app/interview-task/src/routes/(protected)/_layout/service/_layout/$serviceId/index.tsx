import { createFileRoute } from '@tanstack/react-router'
import ServiceUpdateForm from '../../../../../../features/service-requests/view/service-update.form'

export const Route = createFileRoute(
  '/(protected)/_layout/service/_layout/$serviceId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><ServiceUpdateForm /></div>
}

// This route is kept for backward compatibility
// Primary edit route is at /(protected)/_layout/service/edit/$serviceId
