import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Reducer } from "react"
import Login from "../../../pages/login/Login"
import { login, user } from "./interface"

interface authState{
    login:login |null
    user:user|null
}
 const initialState:authState ={
    login:null,
    user:null
 }

export const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser:(state, action:PayloadAction<user>)=>{
            state.user = action.payload
        }
    }
    
})


export const {setUser} = authSlice.actions


export default authSlice.reducer