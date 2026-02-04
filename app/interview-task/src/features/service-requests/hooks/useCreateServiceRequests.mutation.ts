import { useMutation } from "@tanstack/react-query"
import { create } from "../../../services/api/services.api"


export const postServcieData = ()=> ({
    mutationFn : (data : any) => create(data)
})


export const useCreateServiceRequest = ()=> {
    
    return useMutation({
        mutationFn : (data : any) => create(data),
        onSuccess : (data: any)=> {
            if (data.status=== 422) {
                return data
            }
            console.log(data.response,' mutation of services');
        },
        onError : (data : any)=> {
            console.log(data, 'error data mutation');
        }
    })
}