import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store';

import { FilmEntry, PeopleEntry, PlanetEntry, SpeciesEntry, StarshipEntry, VehicleEntry } from "../types/dataTypes";

type DataState = {
  [key in 'data' | 'searchData']: PeopleEntry[] | VehicleEntry[] | StarshipEntry[] | PlanetEntry[] | SpeciesEntry[] | FilmEntry[];
} & {
  isLoading: boolean;
  isSearching: boolean;

  speciesNames: {
    [key: string]: string,
  }

  selectedDataType: string,
  fetchUrl: string,

  error: Error | null;
};

const initialState = {
  isLoading: false,
  isSearching: false,

  data: [],
  searchData: [],
  speciesNames: {},

  selectedDataType: 'people',
  fetchUrl: `https://swapi.py4e.com/api/people/`,

  error: null,  
} as DataState;

export const getSpeciesNames = createAsyncThunk(
  'data/getSpeciesName',
  async(_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
      let speciesDictionary: {[key: string]: string} = {};
      let total: SpeciesEntry[] = [];

      let response = await fetch(`https://swapi.py4e.com/api/species/`);
      let data = await response.json();
      total = total.concat(data.results);
      
      while(data.next) {      
        if (data.next === null) {
          break;
        } else {
          data = await fetch(data.next);
          data = await data.json();        
          total = total.concat(data.results);
        }        
      }
      
      for (let entry of total) {
        speciesDictionary[entry.url] = entry.name;
      }

      return speciesDictionary;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSpeciesNames.fulfilled, (state, action) => {
      state.speciesNames = action.payload;
    }),
    builder.addCase(getSpeciesNames.rejected, (state, action) => {
      state.error = action.payload as Error;
    })
  }
})

export default dataSlice.reducer;