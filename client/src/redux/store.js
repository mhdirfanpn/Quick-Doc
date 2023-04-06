import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import doctorReducer from "./doctorSlice"
import adminReducer from "./doctorSlice"

export const store  = configureStore({
    reducer:{
        user : userReducer,
        doctor : doctorReducer,
        admin : adminReducer
 
    }
})

export default store