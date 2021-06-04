// createSlice uses immer, it's ok to "reassign" the state
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: null,
  visibleSeverities: ['INFO', 'WARNING', 'ERROR'],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setSeverityVisible(state, action) {
      const { shouldShow, severity } = action.payload;
      const isShown = state.visibleSeverities.includes(severity);
      if (shouldShow && !isShown) {
        state.visibleSeverities.push(severity);
      }
      if (!shouldShow && isShown) {
        state.visibleSeverities = state.visibleSeverities.filter((shown) => shown !== severity);
      }
    },
  },
});

export const {
  setDarkMode, setSeverityVisible,
} = settingsSlice.actions;
export default settingsSlice.reducer;
