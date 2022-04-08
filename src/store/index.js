import { configureStore } from "@reduxjs/toolkit";
import listReducers from "./listReducers";

export const store = configureStore({
  reducer: { listReducers }
});