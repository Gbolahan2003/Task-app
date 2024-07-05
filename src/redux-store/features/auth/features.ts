import { Dispatch } from "redux";
import { login  as LoginType} from "./interface";
import axios from 'axios'
import baseUrl from "../../../routes";
import { handleErrors } from "../../../utils/errorHandler";
import { setUser } from ".";

export const loginFeature = (data:LoginType)=> async(dispatch:Dispatch)=>{
    try {
        const login =  await axios.post(baseUrl.auth+'/login', data)
        
        
        return true
    } catch (error) {
        handleErrors(error)
        console.log(error);
        
        return false
    }

}

// export const testFeature =()=> async(dispatch:Dispatch)=>{

//     try {
//         const test = await axios.get('https://to-do-jdxn.onrender.com/test')
//         console.log(test);
                
//     } catch (error) {
//         handleErrors(error)
//         return false
//     }
// }