import apiClient from "./api.client"

export const login = async (email : string, password:string)=> {
    const res = await apiClient.post('login', {email,password})
    return res.data;
}