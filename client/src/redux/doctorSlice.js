import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctor:null,
    token:null
}

const doctorSlice = createSlice({
    name:"doctor",
    initialState,
    reducers:{          
             
        setDoctorLogin: (state,action)=>{
            state.doctor = action.payload.doctor;
            state.token = action.payload.token;
        }
    }
})

export const {setDoctorLogin} = doctorSlice.actions;

export default doctorSlice.reducer;