import { configureStore } from '@reduxjs/toolkit';
import settings from './features/settingsSlice';
import logCache from './features/logCacheSlice';
import logApi from './features/logApiSlice';

const store = configureStore({
  reducer: {
    settings,
    logCache,
    [logApi.reducerPath]: logApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logApi.middleware),
});

export default store;
