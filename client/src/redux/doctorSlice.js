import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: null,
  token: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorLogin: (state, action) => {
      state.doctor = action.payload.doctor;
      state.token = action.payload.token;
    },

    setDoctorLogout: (state) => {
      state.doctor = null;
      state.token = null;
    },
  },
});

export const { setDoctorLogin, setDoctorLogout } = doctorSlice.actions;

export default doctorSlice.reducer;
