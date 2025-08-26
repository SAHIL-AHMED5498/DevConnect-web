import { createSlice } from "@reduxjs/toolkit";



const connectionSlice=createSlice({
    name:"connections",
    initialState:null,
    reducers:{

       addConnections:(state,actions)=>{

        return actions.payload;

       },
       removeConnections:(state,action)=>{
        return null
       }
    }


})


export default connectionSlice.reducer;

export const {addConnections,removeConnections}=connectionSlice.actions;