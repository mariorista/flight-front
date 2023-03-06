import { configureStore } from "@reduxjs/toolkit";

// import selectMatchSlice from "./slices/match/selectedMatchSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    userDataReducer: userSlice,
  },
});

export default store;
