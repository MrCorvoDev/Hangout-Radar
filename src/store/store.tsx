import {configureStore} from '@reduxjs/toolkit';

import {localDataApi} from './api/localDataApi';
import ticketmasterApi from './api/ticketmasterApi';
import userBookmarksReducer from './slices/userBookmarksSlice';
import userPreferencesReducer from './slices/userPreferenceSlice';

const store = configureStore({
   reducer: {
      [localDataApi.reducerPath]: localDataApi.reducer,
      [ticketmasterApi.reducerPath]: ticketmasterApi.reducer,
      userPreferences: userPreferencesReducer,
      userBookmarks: userBookmarksReducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
         localDataApi.middleware,
         ticketmasterApi.middleware,
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
