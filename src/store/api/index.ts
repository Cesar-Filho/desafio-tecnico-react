import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note } from '~/@types/notes';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://your-api-url.com/';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Note'],
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => 'notes',
      providesTags: ['Note'],
    }),
    addNote: builder.mutation<Note, Note>({
      query: (note) => ({
        url: 'notes',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<Note, Note>({
      query: (note) => ({
        url: `notes/${note.id}`,
        method: 'PUT',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation<Note, string>({
      query: (id) => ({
        url: `notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
