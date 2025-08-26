import { createSlice } from "@reduxjs/toolkit";




const requestSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,actions)=>{
            return(actions.payload)
        },
        removeRequests:(state,actions)=>{
            return null;
        }
    }
})


export default requestSlice.reducer;
export const {addRequests,removeRequests}=requestSlice.actions;