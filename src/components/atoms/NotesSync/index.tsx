import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } from '~/store/api';
import { OfflineAction, OfflineQueueActions } from '~/store/slices/offlineQueue';
import { useAppDispatch, useAppSelector } from '~/store';

export const NotesSync = () => {
  const queue = useAppSelector((state) => state.offlineQueue.actions);
  const dispatch = useAppDispatch();
  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && queue.length > 0) {
        queue.forEach(async (action: OfflineAction) => {
          if (action.type === 'addNote') {
            await addNote(action.payload);
            dispatch(OfflineQueueActions.dequeueAction());
          }
          if (action.type === 'updateNote') {
            await updateNote(action.payload);
            dispatch(OfflineQueueActions.dequeueAction());
          }
          if (action.type === 'deleteNote') {
            await deleteNote(action.payload.id || action.payload);
            dispatch(OfflineQueueActions.dequeueAction());
          }
        });
      }
    });
    return () => unsubscribe();
  }, [queue, addNote, updateNote, deleteNote, dispatch]);

  return <></>;
};
