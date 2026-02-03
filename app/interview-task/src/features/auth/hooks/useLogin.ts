
import {useMutation, type UseMutationOptions} from "@tanstack/react-query"
import { login } from "../../../services/api/auth.api";

type LoginMutation = typeof login;

type TLoginMutationsOptions = UseMutationOptions<Awaited<ReturnType<LoginMutation>>,Error, {email : string, password : string}>

const LoginMutationOPtions : TLoginMutationsOptions = {
    mutationFn : async ({email, password}) => {
        const response = await login(email,password)
        return response.data;
    }
}

export const useLoginMutaion =()=>  useMutation(LoginMutationOPtions)