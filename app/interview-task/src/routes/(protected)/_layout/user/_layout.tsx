import { createFileRoute } from '@tanstack/react-router'
import UserView from '../../../../features/user/view/user.view'

export const Route = createFileRoute('/(protected)/_layout/user/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><UserView /> </div>
}
