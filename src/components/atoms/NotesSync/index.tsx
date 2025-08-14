import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from '~/store/api';
import { OfflineAction, OfflineQueueActions } from '~/store/slices/offlineQueue';
import { useAppDispatch, useAppSelector } from '~/store';
import { NotesActions } from '~/store/slices/notes';
import { Note } from '~/@types/notes';

function mergeNotes(localNotes: Note[], serverNotes: Note[]) {
  const localMap = new Map(localNotes.map((n) => [n.id, n]));
  serverNotes.forEach((note) => localMap.set(note.id, note));
  return Array.from(localMap.values());
}

function notesAreEqual(a: Note[], b: Note[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function sortNotesByDate(notes: Note[]) {
  return [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export const NotesSync = () => {
  const queue = useAppSelector((state) => state.offlineQueue.actions);
  const localNotes = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();
  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const { data: serverNotes, refetch } = useGetNotesQuery();

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

      if (state.isConnected) {
        refetch();
      }
    });
    return () => unsubscribe();
  }, [queue, addNote, updateNote, deleteNote, dispatch, refetch]);

  useEffect(() => {
    const merged = mergeNotes(localNotes, serverNotes || []);
    const sorted = sortNotesByDate(merged);

    if (!notesAreEqual(sorted, localNotes)) {
      dispatch(NotesActions.setNotes(sorted));
    }
  }, [localNotes, serverNotes, dispatch]);

  return <></>;
};
