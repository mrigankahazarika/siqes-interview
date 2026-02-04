import { fetchServiceTypes } from "../../../services/api/services.api"
import { useQuery } from "@tanstack/react-query";


// set any for all types to save time

const getServiceTypes : any = ()=> {
    return {
        queryKey : ['serviceTypes'],
        queryFn : ()=> fetchServiceTypes()
    }
}

export const useGetServicOptions = ()=> {
        return  useQuery(getServiceTypes())
}
