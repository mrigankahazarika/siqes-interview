import { useDeleteServiceRequest } from "./useDeleteServiceRequests.mutation"

export const useDeleteWithConfirmation = () => {
  const { mutate, isPending } = useDeleteServiceRequest()

  const handleDelete = (id: string, itemName: string = 'this item') => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${itemName}? This action cannot be undone.`
    )
    
    if (confirmed) {
      mutate(id)
    }
  }

  return { handleDelete, isPending }
}
