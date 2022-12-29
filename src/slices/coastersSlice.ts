import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../services/store";
import { TCoaster } from "../services/types";
import { fetchCoasters } from "../services/fetchCoasters";

type TParams =
  | "type"
  | "brand"
  | "kind"
  | "country"
  | "shape"
  | "reverse";

export interface CoastersState {
  status: "loading" | "idle";
  error: string | null;
  items: ReadonlyArray<TCoaster>;
  params: {
    [param in TParams]: string[]
  }
}

const initialState: CoastersState = {
  status: "idle",
  error: null,
  items: [],
  params: {
    type: [],
    brand: [],
    kind: [],
    country: [],
    shape: [],
    reverse: [],
  }
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
      state.params.type = [...new Set(payload.map(item => item.type))];
      state.params.brand = [...new Set(payload.map(item => item.brand).filter(item => item !== '-'))].sort();
      state.params.kind = [...new Set(payload.map(item => item.kind).filter(item => item !== '-'))].sort();
      state.params.country = [...new Set(payload.map(item => item.country).filter(item => item !== '-'))].sort();
      state.params.shape = [...new Set(payload.map(item => item.shape))].sort();
      state.params.reverse = [...new Set(payload.map(item => item.reverse))];
      state.status = "idle";
    });

    builder.addCase(fetchCoasters.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default coastersSlice.reducer;
