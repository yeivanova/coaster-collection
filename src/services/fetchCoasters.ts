import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIUrl } from "../utils/api";
import { TCoaster } from "./types";

type FetchCoastersError = {
  message: string;
};

export const fetchCoasters = createAsyncThunk<
  TCoaster[],
  number,
  { rejectValue: FetchCoastersError }
>("coasters/fetch", async (limit: number, thunkApi) => {
  const response = await fetch(`${APIUrl}`);
  const data: TCoaster[] = await response.json();
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Не удалось загрузить бирдекели.",
    });
  }

  return data;
});
