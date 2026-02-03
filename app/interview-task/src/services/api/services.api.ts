import apiClient from "./api.client"

interface DataStore {
    name : string
}

export const create = async (payload : DataStore) => {
    const res = await apiClient.post('service_request', payload)
    return res.data;
}

export const fetch = async (params : DataStore) => {
    const res = await apiClient.get(`service_request?${params}`, )
    return res.data;
}

