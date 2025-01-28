import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CountryType, SegmentType} from '../api/localDataApi';

export interface UserPreferencesType {
   countries: CountryType[];
   segments: SegmentType[];
}

const saveToLocalStorage = (key: string, value: UserPreferencesType) => {
   localStorage.setItem(key, JSON.stringify(value));
};
const loadFromLocalStorage = (): UserPreferencesType => {
   const storedValue = localStorage.getItem('userPreferences');

   return storedValue
      ? (JSON.parse(storedValue) as UserPreferencesType)
      : {
           countries: [],
           segments: [],
        };
};

const initialState: UserPreferencesType = loadFromLocalStorage();

const userPreferencesSlice = createSlice({
   name: 'userPreferences',
   initialState,
   reducers: {
      updateCountries: (state, action: PayloadAction<CountryType[]>) => {
         state.countries = action.payload;

         saveToLocalStorage('userPreferences', state);
      },
      updateSegments: (state, action: PayloadAction<SegmentType[]>) => {
         state.segments = action.payload;

         saveToLocalStorage('userPreferences', state);
      },
      resetPreferences: state => {
         state.countries = [];
         state.segments = [];

         saveToLocalStorage('userPreferences', state);
      },
   },
});

export const {updateCountries, updateSegments, resetPreferences} =
   userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
