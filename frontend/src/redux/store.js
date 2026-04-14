import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import authReducer from "./slices/authSlice"; // 👈 MUST exist

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer, // 👈 THIS IS REQUIRED
  },
});