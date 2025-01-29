import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ParsedEventType} from '../../types/global';

type UserBookmarksType = ParsedEventType[];

const saveToLocalStorage = (key: string, value: UserBookmarksType) => {
   localStorage.setItem(key, JSON.stringify(value));
};
const loadFromLocalStorage = (): UserBookmarksType => {
   const storedValue = localStorage.getItem('userBookmarks');

   return storedValue ? (JSON.parse(storedValue) as UserBookmarksType) : [];
};

const initialState: ParsedEventType[] = loadFromLocalStorage();

const bookmarksSlice = createSlice({
   name: 'bookmarks',
   initialState,
   reducers: {
      addBookmark: (state, action: PayloadAction<ParsedEventType>) => {
         if (!state.some(event => event.id === action.payload.id)) {
            state.push(action.payload);
         }

         saveToLocalStorage('userBookmarks', state);
      },
      removeBookmark: (state, action: PayloadAction<string>) => {
         state = state.filter(event => event.id !== action.payload);

         saveToLocalStorage('userBookmarks', state);
      },
      clearAllBookmarks: state => {
         state.length = 0;
         state = [];

         saveToLocalStorage('userBookmarks', state);
      },
   },
});

export const {addBookmark, removeBookmark, clearAllBookmarks} =
   bookmarksSlice.actions;
export default bookmarksSlice.reducer;
