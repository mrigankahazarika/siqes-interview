import { createFileRoute } from '@tanstack/react-router'
import ServiceUpdateForm from '../../../../features/service-requests/view/service-update.form'

export const Route = createFileRoute(
  '/(protected)/_layout/service/edit/$serviceId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><ServiceUpdateForm /></div>
}

