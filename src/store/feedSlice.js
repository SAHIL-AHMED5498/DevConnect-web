import { createSlice } from "@reduxjs/toolkit";


const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,actions)=>{
            return actions.payload
        },
        removeFeed:(state,action)=>{
            return null;
        },
        removeFeedUser:(state,action)=>{
            const filteredFeed=state.filter((user)=>{return user._id!==action.payload});
            return filteredFeed;
        }
    }
})

export default feedSlice.reducer

export const {addFeed,removeFeed,removeFeedUser}=feedSlice.actions