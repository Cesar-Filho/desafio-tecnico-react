import React from 'react';
import { render } from '@testing-library/react-native';
import NotesListTemplate from '../index';
import { Note } from '~/@types/notes';

jest.mock('~/components/atoms/FloatingAddButton', () => ({
  FloatingAddButton: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/organisms/NotesFilter', () => ({
  NotesFilter: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/organisms/NotesList', () => ({
  NotesList: jest.fn().mockImplementation(() => null),
}));

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return rn;
});

describe('NotesListTemplate Component', () => {
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

  const mockProps = {
    notes: mockNotes,
    searchText: '',
    onSearchChange: jest.fn(),
    selectedCategory: 'all' as const,
    onCategoryChange: jest.fn(),
    onNotePress: jest.fn(),
    onAddPress: jest.fn(),
    addButtonAccessibilityLabel: 'Add note',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct components and props', () => {
    render(<NotesListTemplate {...mockProps} />);

    const { NotesFilter } = jest.requireMock('~/components/organisms/NotesFilter');
    const { NotesList } = jest.requireMock('~/components/organisms/NotesList');
    const { FloatingAddButton } = jest.requireMock('~/components/atoms/FloatingAddButton');

    expect(NotesFilter).toHaveBeenCalledTimes(1);
    expect(NotesFilter.mock.calls[0][0]).toEqual({
      searchText: mockProps.searchText,
      onSearchChange: mockProps.onSearchChange,
      selectedCategory: mockProps.selectedCategory,
      onCategoryChange: mockProps.onCategoryChange,
    });

    expect(NotesList).toHaveBeenCalledTimes(1);
    expect(NotesList.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        notes: mockProps.notes,
        onNotePress: mockProps.onNotePress,
      })
    );

    expect(FloatingAddButton).toHaveBeenCalledTimes(1);
    expect(FloatingAddButton.mock.calls[0][0]).toEqual({
      onPress: mockProps.onAddPress,
      accessibilityLabel: mockProps.addButtonAccessibilityLabel,
    });
  });

  it('passes correct props when props change', () => {
    const updatedProps = {
      ...mockProps,
      searchText: 'test search',
      selectedCategory: 'annotation' as const,
    };

    render(<NotesListTemplate {...updatedProps} />);

    const { NotesFilter } = jest.requireMock('~/components/organisms/NotesFilter');

    expect(NotesFilter.mock.calls[0][0].searchText).toBe('test search');
    expect(NotesFilter.mock.calls[0][0].selectedCategory).toBe('annotation');
  });
});
