import { createFileRoute } from '@tanstack/react-router'
import USerImageUploadForm from '../../../../features/user/form/user-image-uplaod.form'

export const Route = createFileRoute('/(protected)/_layout/user/edit')({
  component: USerImageUploadForm,
})

function RouteComponent() {
  return <div>Hello "/(protected)/_layout/user/edit"!</div>
}
