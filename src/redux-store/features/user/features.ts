import { Dispatch } from "redux";
import { handleErrors } from "../../../utils/errorHandler";
import axios from "axios";
import baseUrl from "../../../routes";
import { AppThunk } from "../..";
import { setOwner } from ".";
import axiosInstance from "../../../hooks/axiosInstance";



export const getUserFeature =():any=>async(dispatch:Dispatch)=>{
    try {
        const getUser = await axiosInstance.get('user')
        console.log(getUser);
         dispatch(setOwner(getUser.data))
         return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}