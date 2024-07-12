import { Dispatch } from "redux";
import { Todo } from "../../../react-app-env";
import { handleErrors } from "../../../utils/errorHandler";
import axiosInstance from "../../../hooks/axiosInstance";



const createToDoFeature =(data:Todo)=> async(data:Dispatch)=>{
    try {
        const response = axiosInstance.post(`task`)
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}