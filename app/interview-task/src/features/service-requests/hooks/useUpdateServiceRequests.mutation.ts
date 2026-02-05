import { useMutation } from "@tanstack/react-query"
import { update } from "../../../services/api/services.api"


export const useUpdateServiceRequest = ()=> {
    
    return useMutation({
        mutationFn : (data : any) => update(data.id, data.payload),
        onSuccess : (data: any)=> {
            if (data.status=== 422) {
                return data;
            }
            console.log(data, 'if success');
            
            if (data.data) {
                alert('Service updated')                
            }
        },
        onError : (data : any)=> {
            console.log(data.response, 'error data mutation');
        }
    })
}
