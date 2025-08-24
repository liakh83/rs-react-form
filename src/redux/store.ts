import { configureStore } from '@reduxjs/toolkit';

import { sliceForms } from './sliceFormsData';

export const store = configureStore({
  reducer: {
    forms: sliceForms.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
