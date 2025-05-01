import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'mode',
  initialState: {
    mode: 'light',
  },
  reducers: {
    selectMode: (state,actions) => {
      state.mode  = actions.payload.mode;
    },
   
  },
});

export const { selectMode } = themeSlice.actions;

export default themeSlice.reducer;
