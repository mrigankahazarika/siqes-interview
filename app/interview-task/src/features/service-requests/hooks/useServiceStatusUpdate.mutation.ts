// import { useMutation } from "@tanstack/react-query"
// import { update } from "../../../services/api/services.api"


// export const useServiceStatusUpdate = ()=> {
    
//     return useMutation({
//         mutationFn : (data : any) => update(data.id, data.payload),
//         onSuccess : (data: any)=> {
//             if (data.status=== 422) {
//                 return data;
//             }
//             if (data.data) {
//                 alert('Service updated')                
//             }
//         },
//         onError : (data : any)=> {
//             console.log(data, 'error data mutation');
//         }
//     })
// }
