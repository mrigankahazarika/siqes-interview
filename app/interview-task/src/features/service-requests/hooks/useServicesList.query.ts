import { fetch, fetchServiceTypes } from "../../../services/api/services.api"
import { useQuery } from "@tanstack/react-query";


// set any for all types to save time

const getServicesRequests : any = (page : number , limit: number)=> {
    return {
        queryKey : ['serviceRequests'],
        queryFn : ()=> fetch(page, limit)
    }
}

export const useGetServicrequests = (page : number , limit : string)=> {
        return  useQuery(getServicesRequests(page , limit))
}
