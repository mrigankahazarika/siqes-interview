
import {useMutation, type UseMutationOptions} from "@tanstack/react-query"
import { login } from "../../../services/api/auth.api";
import { TokenService } from "../../../services/tokens/token.service";
import { toast } from "sonner";

type LoginMutation = typeof login;

type TLoginMutationsOptions = UseMutationOptions<Awaited<ReturnType<LoginMutation>>,Error, {email : string, password : string}>

const LoginMutationOPtions : TLoginMutationsOptions = {
    mutationFn : async ({email, password}) => {
        const response = await login(email,password)
        return response;
    },
    onSuccess: (data) => {
        toast.success("Login Successful");
        if (data.access_token) {
            TokenService.updateLocalAccessToken(data.access_token);
        }
    },
    onError : (error)=> {
        console.log(error,'error in login mutation');
        
        toast.error(`Login Failed: ${error.message}`);
    }
}

export const useLoginMutaion =()=>  useMutation(LoginMutationOPtions)