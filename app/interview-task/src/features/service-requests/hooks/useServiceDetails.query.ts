import { fetch, fetchServiceTypes, single } from "../../../services/api/services.api"
import { useQuery } from "@tanstack/react-query";


// set any for all types to save time

const getServicesRequestsDetails : any = (id : string)=> {
    return {
        queryKey : ['serviceRequestsDetails'],
        queryFn : ()=> single(id)
    }
}

export const useGetServicrequestsDetails = ()=> {
        return  useQuery(getServicesRequestsDetails())
}
