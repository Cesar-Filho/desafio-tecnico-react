import React from 'react';
import { render } from '@testing-library/react-native';
import NetInfo from '@react-native-community/netinfo';
import { NotesSync } from '../index';

jest.mock('~/store', () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
  useAppSelector: jest.fn((selector) => {
    const state = {
      offlineQueue: { actions: [] },
      notes: { notes: [] },
    };
    return selector(state);
  }),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn((callback) => {
    callback({ isConnected: true });
    return jest.fn();
  }),
}));

jest.mock('~/store/api', () => ({
  notesApi: {
    reducerPath: 'notesApi',
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
  useGetNotesQuery: jest.fn(() => ({
    data: [],
    refetch: jest.fn(),
  })),
  useAddNoteMutation: jest.fn(() => [jest.fn()]),
  useUpdateNoteMutation: jest.fn(() => [jest.fn()]),
  useDeleteNoteMutation: jest.fn(() => [jest.fn()]),
}));

describe('NotesSync Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers a NetInfo listener', () => {
    render(<NotesSync />);
    expect(NetInfo.addEventListener).toHaveBeenCalled();
  });
});
