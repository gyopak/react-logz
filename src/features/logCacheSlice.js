// createSlice uses immer, it's ok to "reassign" the state
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  isPollingEnabled: true,
  // a wild guess for the max count of stored logs
  // after a few thousand lines the rendering is too chunky
  cacheSize: 200,
  counts: {
    error: 0,
    warning: 0,
    info: 0,
  },
};

const countLogsByType = (logs, type) => (
  logs.filter((log) => log.type === type).length
);

const logCacheSlice = createSlice({
  name: 'logCache',
  initialState,
  reducers: {
    receivePolledLogs(state, action) {
      const newLogs = action.payload;
      state.logs.push(...newLogs);
      state.counts.error += countLogsByType(newLogs, 'ERROR');
      state.counts.warning += countLogsByType(newLogs, 'WARNING');
      state.counts.info += countLogsByType(newLogs, 'INFO');
      if (state.logs.length > state.cacheSize) {
        // wipe old logs, cache is full
        state.logs.splice(0, state.cacheSize / 2);
      }
    },
    receiveOldLogs(state, action) {
      state.isPollingEnabled = false;
      const oldLogs = action.payload;
      state.logs.unshift(...oldLogs);
      state.counts.error += countLogsByType(oldLogs, 'ERROR');
      state.counts.warning += countLogsByType(oldLogs, 'WARNING');
      state.counts.info += countLogsByType(oldLogs, 'INFO');
      if (state.logs.length > state.cacheSize) {
        // again but with the newer logs
        const amountToWipe = state.cacheSize / 2;
        const lastLogIndexToKeep = state.logs.length - amountToWipe;
        state.logs.splice(lastLogIndexToKeep, amountToWipe);
      }
    },
    enablePolling(state) {
      state.isPollingEnabled = true;
    },
    reset(state) {
      state.logs = initialState.logs;
      state.isPollingEnabled = true;
    },
  },
});

export const {
  receivePolledLogs, receiveOldLogs, enablePolling, reset,
} = logCacheSlice.actions;
export default logCacheSlice.reducer;
