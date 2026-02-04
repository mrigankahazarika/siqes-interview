import { fetch, fetchServiceTypes } from "../../../services/api/services.api"
import { useQuery } from "@tanstack/react-query";


// set any for all types to save time

const getServicesRequests : any = (page : string, limit: string)=> {
    return {
        queryKey : ['serviceRequests'],
        queryFn : ()=> fetch(1, 10)
    }
}

export const useGetServicrequests = ()=> {
        return  useQuery(getServicesRequests())
}
