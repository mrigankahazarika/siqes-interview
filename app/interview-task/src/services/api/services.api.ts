import id from "zod/v4/locales/id.js";
import apiClient from "./api.client"

interface DataStore {
    name : string
    id : string
}

interface IPagination {
    page : string;
    limit : string;
    offset? : string;

}

export const create = async (payload : DataStore) => {
    try {
        const res = await apiClient.post('auth/service_request', payload)
        return res.data;
    } catch (error) {
        return error;
    }
}


// for list fetch
export const fetch = async (page : number , limit : number) => {
    // const res = await apiClient.get(`service_request?${params}`, )
    const res = await apiClient.get(`auth/service_request?page=${page}&limit=${limit}`, )
    return res.data;
}

// for list fetchDetails
export const single = async (id : string) => {
    // const res = await apiClient.get(`service_request?${params}`, )
    const res = await apiClient.get(`auth/service_request/${id}`, )
    return res.data;
}



export const fetchServiceTypes = async () => {
    const res = await apiClient.get(`auth/service_request/types`)
    return res.data;
}

// for update
export const update = async (id: string, payload: any) => {
    try {
        const res = await apiClient.patch(`auth/service_request/${id}`, payload)
        return res.data;
    } catch (error) {
        return error;
    }
}

// for delete
export const deleteService = async (id: string) => {
    try {
        const res = await apiClient.delete(`auth/service_request/${id}`)
        return res.data;
    } catch (error) {
        return error;
    }
}

