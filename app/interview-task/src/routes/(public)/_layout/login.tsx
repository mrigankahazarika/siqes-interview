import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../../../features/auth/login'

export const Route = createFileRoute('/(public)/_layout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    login
    <LoginPage />
  </div>
}
