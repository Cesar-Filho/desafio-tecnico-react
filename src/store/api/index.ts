import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note } from '~/@types/notes';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com/' }),
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
  }),
});

export const { useGetNotesQuery, useAddNoteMutation } = notesApi;
