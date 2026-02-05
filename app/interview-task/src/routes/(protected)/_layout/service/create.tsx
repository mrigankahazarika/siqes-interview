import { createFileRoute } from '@tanstack/react-router'
import ServiceCreateForm from '../../../../features/service-requests/view/service-create.form'

export const Route = createFileRoute('/(protected)/_layout/service/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><ServiceCreateForm /></div>
}
