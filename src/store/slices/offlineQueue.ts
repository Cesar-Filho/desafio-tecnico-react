import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OfflineAction {
  type: string;
  payload: any;
}

interface OfflineQueueState {
  actions: OfflineAction[];
}

const initialState: OfflineQueueState = {
  actions: [],
};

const offlineQueueSlice = createSlice({
  name: 'offlineQueue',
  initialState,
  reducers: {
    enqueueAction: (state, action: PayloadAction<OfflineAction>) => {
      state.actions.push(action.payload);
    },
    dequeueAction: (state) => {
      state.actions.shift();
    },
    clearQueue: (state) => {
      state.actions = [];
    },
  },
});

export const OfflineQueueActions = offlineQueueSlice.actions;
export const offlineQueueReducer = offlineQueueSlice.reducer;
