import { createFileRoute } from '@tanstack/react-router'
import   DashboardView  from '../../../../features/dashboard/view'

export const Route = createFileRoute('/(protected)/_layout/dashboard/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardView />;
}
