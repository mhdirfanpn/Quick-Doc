import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import doctorReducer from "./doctorSlice"
import adminReducer from "./doctorSlice"
import spinnerReducer from "./spinnerSlice";

export const store  = configureStore({
    reducer:{
        user : userReducer,
        doctor : doctorReducer,
        admin : adminReducer,
        spinner:spinnerReducer,
    }
})

export default store