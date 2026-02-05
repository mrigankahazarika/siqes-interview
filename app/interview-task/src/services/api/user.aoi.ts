import { apiclientformdata } from "./api.client"

export const editProfile = async (data : any)=> {
    const res = await apiclientformdata.patch(`auth/me`, data)
    return res.data;
}
