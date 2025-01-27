import {configureStore} from '@reduxjs/toolkit';

import {localDataApi} from './api/localDataApi';

const store = configureStore({
   reducer: {
      [localDataApi.reducerPath]: localDataApi.reducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(localDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
