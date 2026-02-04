import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ServicesTable } from '../../../../features/service-requests/view/service,tabble'

export const Route = createFileRoute('/(protected)/_layout/service/_layout')({
  component: ServicesTable,
})

function RouteComponent() {
  return <div><Outlet /></div>
}
