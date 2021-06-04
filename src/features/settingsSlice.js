// createSlice uses immer, it's ok to "reassign" the state
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: null,
  infosVisible: true,
  warningsVisible: true,
  errorsVisible: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setInfosVisibility(state, action) {
      state.infosVisible = action.payload;
    },
    setWarningsVisibility(state, action) {
      state.warningsVisible = action.payload;
    },
    setErrorsVisibility(state, action) {
      state.errorsVisible = action.payload;
    },
  },
});

export const {
  setDarkMode, setInfosVisibility, setWarningsVisibility, setErrorsVisibility,
} = settingsSlice.actions;
export default settingsSlice.reducer;
