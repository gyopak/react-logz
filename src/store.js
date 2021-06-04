import { configureStore } from '@reduxjs/toolkit';
import settings from './features/settingsSlice';
import logSlice from './features/logApiSlice';

const store = configureStore({
  reducer: {
    settings,
    [logSlice.reducerPath]: logSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logSlice.middleware),
});

export default store;
