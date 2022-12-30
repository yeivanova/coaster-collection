import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const params = ["type", "brand", "kind", "country", "shape", "reverse"] as const;

export type TValues = {
	[K in typeof params[number]]: string[]
}

const initialState: TValues = {
  type: [],
  brand: [],
  kind: [],
  country: [],
  shape: [],
  reverse: [],
};

export const filterParamsSlice = createSlice({
  name: "filterParams",
  initialState,
  reducers: {
    fillParams: (state, action: PayloadAction<TValues>) => {
      state.type = action.payload.type;
      state.brand = action.payload.brand.filter(item => item !== '-');
      state.kind = action.payload.kind.filter(item => item !== '-');
      state.country = action.payload.country.filter(item => item !== '-');
      state.shape = action.payload.shape;
      state.reverse = action.payload.reverse;
    },
  },
});

export const { fillParams } = filterParamsSlice.actions
export default filterParamsSlice.reducer;
