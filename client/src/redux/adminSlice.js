import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:null,
    token:null
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{          
             
        setAdminLogin: (state,action)=>{
            state.admin = action.payload.admin;
            state.admin = action.payload.token;
        },

        setAdminLogout: (state)=>{
            state.admin = null;
            state.token = null;
        }
    }
})

export const {setAdminLogin,setAdminLogout} = adminSlice.actions;

export default adminSlice.reducer;