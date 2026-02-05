import { fetch, fetchServiceTypes } from "../../../services/api/services.api"
import { useQuery } from "@tanstack/react-query";


// set any for all types to save time

const getServicesRequests : any = (page : number , limit: number, status?: string, sort?: string)=> {
    return {
        queryKey : ['serviceRequests', page , limit, status, sort],
        queryFn : ()=> fetch(page, limit, status, sort)
    }
}

export const useGetServicrequests = (page : number , limit : number, status?: string, sort?: string)=> {
        return  useQuery(getServicesRequests(page , limit, status, sort))
}
