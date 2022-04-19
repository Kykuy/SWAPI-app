import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store'

const initialState = {
  data: {}
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},

  extraReducers: {

  }
})

export default dataSlice.reducer;