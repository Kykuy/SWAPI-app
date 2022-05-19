import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store';

import { FilmEntry, PeopleEntry, PlanetEntry, SpeciesEntry, StarshipEntry, VehicleEntry } from "../types/dataTypes";

interface PagesState {
  pages: {
    [key: number]: PeopleEntry[] | VehicleEntry[] | StarshipEntry[] | PlanetEntry[] | SpeciesEntry[] | FilmEntry[];
  },
  itemsPerPage: number,
  pageSelected: number,
}

const initialState = {
  pages: {},
  itemsPerPage: 10,
  pageSelected: 1,
} as PagesState;

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},

  extraReducers: {

  }
})

export default pagesSlice.reducer;