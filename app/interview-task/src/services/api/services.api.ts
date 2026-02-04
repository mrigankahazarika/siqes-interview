import apiClient from "./api.client"

interface DataStore {
    name : string
}

interface IPagination {
    page : string;
    limit : string;
    offset? : string;

}

export const create = async (payload : DataStore) => {
    try {
        const res = await apiClient.post('service_request', payload)
        return res.data;
    } catch (error) {
        return error;
    }
}

export const fetch = async (params : IPagination) => {
    // const res = await apiClient.get(`service_request?${params}`, )
    const res = await apiClient.get(`service_request`, )
    return res.data;
}

export const fetchServiceTypes = async () => {
    const res = await apiClient.get(`service_request/types`)
    return res.data;
}

