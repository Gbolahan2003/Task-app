import { Dispatch } from "redux";
import { Todo } from "../../../react-app-env";
import { handleErrors } from "../../../utils/errorHandler";
import axiosInstance from "../../../hooks/axiosInstance";
import { useAppDispatch } from "../../../hooks/store";
import { setTodo, setTodos } from "./todoSlice";
import { toast } from "sonner";

import axios from "axios";



export const createToDoFeature =(data:Todo):any=> async(dispatch:Dispatch)=>{
    try {

        const response =  await axiosInstance.post(`task`, data)
        toast.success(response.data.message)
            
        
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const getToDosFeature =():any=>async(dispatch:Dispatch)=>{
    try {
        const response = await axiosInstance.get('task/allTasks')
        dispatch(setTodos(response.data.body))
        
    } catch (error) {
        handleErrors(error)

    }
}

export const getToDoByIdFeature =(id:string):any=>async(dispatch:Dispatch)=>{
    try {
        const response = await axiosInstance.get(`task/${id}`)
        
        dispatch(setTodo(response.data.body))
        
    } catch (error) {
        handleErrors(error)
    }
}
export const updateTodoStatus =(id:string, status:string):any=>async(dispatch:Dispatch)=>{
    try {
        const response = await  axiosInstance.patch(`task/status/${id}`, {status:status})
        
        toast.success(response.data.message)
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const deleteTodoFeature =(id:string):any=>async(dispatch:Dispatch)=>{
    try {
        const response = await axiosInstance.delete(`task/${id}`)
        toast.success(response.data.message)
        return true

    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const updtateToDoFeature = (id:string, data:Todo):any=>async(dispatch:Dispatch)=>{
    try {
        const response = await axiosInstance.put(`task/${id}`, data)
        toast.success(response.data.message)
        return true
        
    } catch (error) {
        handleErrors(error)
        return false
    }
}


export const updateTestFeature =(id:string, message:string):any=> async(dispatch:Dispatch)=>{
    try {
        const response =  await axios.patch(`http://localhost:8080/test/${id}`,{message:message} )
        console.log(response);
        return true
        
    } catch (error) {
        handleErrors(error)
        return false
    }
}