import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { user } from "./interface";


interface userState {
    user:user |null
}

const initialState:userState ={
    user:null
}

export const userSlice = createSlice({
    name:'users',
    initialState:initialState,
    reducers:{
        setOwner:(state:userState, action:PayloadAction<user>)=>{
        state.user = action.payload

        }

    }


})

export const {setOwner} = userSlice.actions
export default userSlice.reducer
