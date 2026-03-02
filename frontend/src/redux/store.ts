import { configureStore } from '@reduxjs/toolkit';
import choreReducer from './choreSlice';

export const store = configureStore({
  reducer: {
    chores: choreReducer,
  },
});

// Inferred types for useSelector and useDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
