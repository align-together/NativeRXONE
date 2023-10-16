import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileSlice";
import selectDateReducer from "./selectDate/selectDateSlice";
export const store = configureStore({
  reducer: {
    selectDate :selectDateReducer,
    profile :profileReducer,
  },
});
