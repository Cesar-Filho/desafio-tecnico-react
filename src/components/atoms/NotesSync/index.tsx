import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { useAddNoteMutation } from '~/store/api';
import { useAppDispatch, useAppSelector } from '~/store';
import { OfflineAction, OfflineQueueActions } from '~/store/slices/offlineQueue';

export const NotesSync = () => {
  const queue = useAppSelector((state) => state.offlineQueue.actions);
  const dispatch = useAppDispatch();
  const [addNote] = useAddNoteMutation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && queue.length > 0) {
        queue.forEach(async (action: OfflineAction) => {
          if (action.type === 'addNote') {
            await addNote(action.payload);
            dispatch(OfflineQueueActions.dequeueAction());
          }
        });
      }
    });
    return () => unsubscribe();
  }, [queue, addNote, dispatch]);

  return <></>;
};
