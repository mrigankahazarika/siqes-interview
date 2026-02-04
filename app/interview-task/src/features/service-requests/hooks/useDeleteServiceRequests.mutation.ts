import { useMutation } from "@tanstack/react-query"
import { deleteService } from "../../../services/api/services.api"


export const useDeleteServiceRequest = ()=> {
    
    return useMutation({
        mutationFn : (id : string) => deleteService(id),
        onSuccess : (data: any)=> {
            if (data.status=== 422) {
                return data;
            }
            if (data.data || data.message) {
                alert('Service deleted successfully')                
            }
        },
        onError : (data : any)=> {
            console.log(data, 'error data mutation');
            alert('Error deleting service')
        }
    })
}
