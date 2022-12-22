import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../services/store";
import { TCoaster } from "../services/types";
import { fetchCoasters } from "../services/fetchCoasters";

export interface CoastersState {
  status: "loading" | "idle";
  error: string | null;
  items: ReadonlyArray<TCoaster>;
}

const initialState: CoastersState = {
  status: "idle",
  error: null,
  items: [],
};

export const selectStatus = (state: RootState) => state.coasters.status;

export const coastersSlice = createSlice({
  name: "coasters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoasters.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchCoasters.fulfilled, (state, { payload }) => {
      state.items = [...payload];
      state.status = "idle";
    });

    builder.addCase(fetchCoasters.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default coastersSlice.reducer;
