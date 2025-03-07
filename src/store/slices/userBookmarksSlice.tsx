import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {EventType} from '../../types/ticketmaster';

interface UserBookmarksType {
   bookmarks: EventType[];
}

const saveToLocalStorage = (key: string, value: UserBookmarksType) => {
   localStorage.setItem(key, JSON.stringify(value));
};
const loadFromLocalStorage = (): UserBookmarksType => {
   const storedValue = localStorage.getItem('userBookmarks');

   return storedValue
      ? (JSON.parse(storedValue) as UserBookmarksType)
      : {
           bookmarks: [],
        };
};

const initialState: UserBookmarksType = loadFromLocalStorage();

const bookmarksSlice = createSlice({
   name: 'bookmarks',
   initialState,
   reducers: {
      addBookmark: (state, action: PayloadAction<EventType>) => {
         if (!state.bookmarks.some(event => event.id === action.payload.id)) {
            state.bookmarks.push(action.payload);
         }

         saveToLocalStorage('userBookmarks', state);
      },
      removeBookmark: (state, action: PayloadAction<string>) => {
         state.bookmarks = state.bookmarks.filter(
            event => event.id !== action.payload,
         );

         saveToLocalStorage('userBookmarks', state);
      },
      clearAllBookmarks: state => {
         state.bookmarks = [];

         saveToLocalStorage('userBookmarks', state);
      },
   },
});

export const {addBookmark, removeBookmark, clearAllBookmarks} =
   bookmarksSlice.actions;
export default bookmarksSlice.reducer;
