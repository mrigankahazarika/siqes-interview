import { getMeAUth } from "../../../services/api/auth.api";
import { useQuery } from "@tanstack/react-query";


// set any for all types to save time

const getAuthMe : any = ()=> {
    return {
        queryKey : ['getme'],
        queryFn : ()=> getMeAUth()
    }
}

export const useAuthmeGet = ()=> {
        return  useQuery(getAuthMe())
}
