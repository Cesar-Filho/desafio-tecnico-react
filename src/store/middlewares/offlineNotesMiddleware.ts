import { Middleware } from '@reduxjs/toolkit';
import NetInfo from '@react-native-community/netinfo';

import { OfflineAction, offlineQueueActions } from '../slices/offlineQueue';

export const offlineNotesMiddleware: Middleware = (store) => (next) => (action) => {
  if (action && typeof action === 'object' && 'type' in action && action.type === 'notes/addNote') {
    const noteAction = action as OfflineAction;

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        store.dispatch(
          offlineQueueActions.enqueueAction({ type: 'addNote', payload: noteAction.payload })
        );
      }
    });
    return next(action);
  }
  return next(action);
};
