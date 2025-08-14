import { Middleware } from '@reduxjs/toolkit';
import NetInfo from '@react-native-community/netinfo';

import { OfflineAction, OfflineQueueActions } from '../slices/offlineQueue';

export const offlineNotesMiddleware: Middleware = (store) => (next) => (action) => {
  if (
    action &&
    typeof action === 'object' &&
    'type' in action &&
    (action.type === 'notes/addNote' ||
      action.type === 'notes/updateNote' ||
      action.type === 'notes/removeNote')
  ) {
    const noteAction = action as OfflineAction;

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        let queueType: string;
        if (action.type === 'notes/addNote') queueType = 'addNote';
        else if (action.type === 'notes/updateNote') queueType = 'updateNote';
        else if (action.type === 'notes/deleteNote') queueType = 'deleteNote';
        else queueType = action.type as string;

        store.dispatch(
          OfflineQueueActions.enqueueAction({ type: queueType, payload: noteAction.payload })
        );
      }
    });
    return next(action);
  }
  return next(action);
};
