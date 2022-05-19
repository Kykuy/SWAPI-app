import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataReducer';
import pagesReducer from './pagesReducer';

export const store = configureStore({
  reducer: {
    dataReducer,
    pagesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;