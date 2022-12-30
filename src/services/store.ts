import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import coastersReducer from "../slices/coastersSlice";
import filterParamsSlice from "../slices/filterParamsSlice";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    coasters: coastersReducer,
    filterParams: filterParamsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
