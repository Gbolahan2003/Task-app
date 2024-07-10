import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Reducer } from "react"
import Login from "../../../pages/login/Login"
import { login, user } from "./interface"

interface authState{
    login:login |null
    accessToken:string|null
}
 const initialState:authState ={
    login:null,
    accessToken:null
 }

export const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setAccessToken:(state:authState, action:PayloadAction<string>)=>{
            state.accessToken = action.payload
        }
    }
    
})


export const {setAccessToken} = authSlice.actions


export default authSlice.reducer