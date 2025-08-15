import React from 'react';
import { render } from '@testing-library/react-native';
import { NotesList } from '../index';
import { Note } from '~/@types/notes';

jest.mock('~/components/molecules/NoteCard', () => ({
  NoteCard: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/atoms/EmptyState', () => ({
  EmptyState: jest.fn().mockImplementation(() => null),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'emptyState.noNotes': 'No notes found',
        };
        return translations[key] || key;
      },
    };
  },
}));

describe('NotesList Component', () => {
  const mockNotes: Note[] = [
    {
      id: '1',
      category: 'annotation',
      title: 'Test Note 1',
      description: 'Description 1',
      images: [],
      createdAt: '2023-10-15T12:00:00Z',
      updatedAt: '2023-10-15T12:00:00Z',
    },
    {
      id: '2',
      category: 'recommendation',
      description: 'Description 2',
      images: [],
      createdAt: '2023-10-16T12:00:00Z',
      updatedAt: '2023-10-16T12:00:00Z',
    },
  ];

  const mockOnNotePress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders NoteCard components with correct props when notes are provided', () => {
    render(<NotesList notes={mockNotes} onNotePress={mockOnNotePress} />);

    const { NoteCard } = jest.requireMock('~/components/molecules/NoteCard');
    const { EmptyState } = jest.requireMock('~/components/atoms/EmptyState');

    expect(NoteCard).toHaveBeenCalledTimes(mockNotes.length);

    expect(NoteCard.mock.calls[0][0].note).toEqual(mockNotes[0]);
    expect(NoteCard.mock.calls[1][0].note).toEqual(mockNotes[1]);

    expect(EmptyState).not.toHaveBeenCalled();
  });

  it('renders EmptyState when no notes are provided', () => {
    render(<NotesList notes={[]} onNotePress={mockOnNotePress} />);

    const { EmptyState } = jest.requireMock('~/components/atoms/EmptyState');

    expect(EmptyState).toHaveBeenCalledTimes(1);
    expect(EmptyState.mock.calls[0][0].message).toBe('No notes found');
  });

  it('passes the onNotePress callback to NoteCard', () => {
    render(<NotesList notes={mockNotes} onNotePress={mockOnNotePress} />);

    const { NoteCard } = jest.requireMock('~/components/molecules/NoteCard');

    const onPressCallback = NoteCard.mock.calls[0][0].onPress;
    onPressCallback();

    expect(mockOnNotePress).toHaveBeenCalledWith(mockNotes[0].id);
  });
});
