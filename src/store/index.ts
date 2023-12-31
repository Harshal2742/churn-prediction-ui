import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const store = configureStore({
  reducer: {
    user: userReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;