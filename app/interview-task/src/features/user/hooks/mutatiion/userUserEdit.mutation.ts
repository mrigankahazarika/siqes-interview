import { useMutation } from "@tanstack/react-query"
import { editProfile } from "../../../../services/api/user.aoi";
import { toast } from "sonner";
// import { create } from "../../../services/api/services.api"


// export const postServcieData = ()=> ({
//     mutationFn : (data : any) => create(data)
// })


export const useUserEditProfileMutation = ()=> {
    
    return useMutation({
        mutationFn : (data : any) => editProfile(data),
        onSuccess : (data: any)=> {
            if (data.status=== 422) {
                return data;
            }
            // console.log(data,' mutation of services');
            if (data.data) {
                alert('Profile updated successfully')                
            }
        },
        onError : (data : any)=> {
            console.log(data.response, 'error data mutation');
            toast.error(data.response?.data?.message || 'Profile update failed');
        }
    })
}