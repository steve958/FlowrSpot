import { configureStore } from '@reduxjs/toolkit';
import flowrReducer from '../features/flowrSlice'

export const store = configureStore({
  reducer: {
    flowr: flowrReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
