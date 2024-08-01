import { Dispatch } from "redux";
import { login  as LoginType, register} from "./interface";
import axios from 'axios'
import baseUrl from "../../../routes";
import { handleErrors } from "../../../utils/errorHandler";
import setAuthToken from "../../../utils/setAuthToken";
import axiosInstance from "../../../hooks/axiosInstance";
import { toast } from "sonner";



axios.defaults.withCredentials = true;
    

export const loginFeature = (data:LoginType)=> async(dispatch:Dispatch)=>{
    try {
        const login =  await axios.post(`${baseUrl.auth}/login`, data)
        
        setAuthToken(login.data.user.sessionToken)
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }

}

export const registerFeature =(data:register)=>async(dispatch:Dispatch)=>{
    try {
        
        const registration = await axios.post(`${baseUrl.auth}/sign-up`, data)
        toast.success(registration.data.message)
        setAuthToken(registration.data.user.sessionToken)
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}
export const testFeature =():any=> async(dispatch:Dispatch)=>{

    try {
axios.defaults.withCredentials = true;

        const test = await axios.get(baseUrl.test)
        console.log(test);
                
    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const logoutFeature =():any=>async(dispatch:Dispatch)=>{
    try {
    const response = await axiosInstance.delete(`${baseUrl.auth}/logout`)
    console.log(response);
    
    toast.success(response.data.message)
    return true
        
    } catch (error) {
        handleErrors(error)
        return false
    }
}