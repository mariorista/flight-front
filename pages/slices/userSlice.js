import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  flightRequest: [],
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserData: (state, action) => {
      // state.userData.notes = action.payload.notes;
      // state.userData.status = action.payload.status;
    },
    setFlightRequest: (state, action) => {
      state.flightRequest = action.payload;
    },
    // setFlightRequestNotesStatus:(state, action) => {
    //   state.flightRequest[action.payload.idx].fuc.status=action.payload.status;
    //   state.flightRequest[action.payload.idx].fuc.notes=action.payload.notes;
    // }
  },
});

export const { storeUserData, setFlightRequest,updateUserData } = userSlice.actions;

export default userSlice.reducer;
