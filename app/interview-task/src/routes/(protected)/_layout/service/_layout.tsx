import { createFileRoute, Outlet } from '@tanstack/react-router'
import ServiceCreateForm from '../../../../features/service-requests/view/service-create.form'

export const Route = createFileRoute('/(protected)/_layout/service/_layout')({
  component: ServiceCreateForm,
})

function RouteComponent() {
  return <div>Hello "/(protected)/_layout/service/_layout"! <Outlet /></div>
}
