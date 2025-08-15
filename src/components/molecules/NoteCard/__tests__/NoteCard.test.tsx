import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Image } from 'react-native';
import { NoteCard } from '../index';
import { Note } from '~/@types/notes';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'categories.annotation': 'Annotation',
          'categories.recommendation': 'Recommendation',
        };
        return translations[key] || key;
      },
    };
  },
}));

describe('NoteCard Component', () => {
  const mockOnPress = jest.fn();

  const mockAnnotationNote: Note = {
    id: '1',
    category: 'annotation',
    title: 'Test Note',
    description: 'This is a test description',
    images: [{ uri: 'https://example.com/image1.jpg' }, { uri: 'https://example.com/image2.jpg' }],
    createdAt: '2023-10-15T12:00:00Z',
    updatedAt: '2023-10-15T12:00:00Z',
  };

  const mockRecommendationNote: Note = {
    id: '2',
    category: 'recommendation',
    description: 'This is a recommendation without title',
    images: [],
    createdAt: '2023-10-16T12:00:00Z',
    updatedAt: '2023-10-16T12:00:00Z',
  };

  const mockNoteWithManyImages: Note = {
    id: '3',
    category: 'annotation',
    title: 'Note with many images',
    description: 'This note has more than 3 images',
    images: [
      { uri: 'https://example.com/image1.jpg' },
      { uri: 'https://example.com/image2.jpg' },
      { uri: 'https://example.com/image3.jpg' },
      { uri: 'https://example.com/image4.jpg' },
      { uri: 'https://example.com/image5.jpg' },
    ],
    createdAt: '2023-10-17T12:00:00Z',
    updatedAt: '2023-10-17T12:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders annotation note correctly', () => {
    const { getByText, getByTestId } = render(
      <NoteCard note={mockAnnotationNote} onPress={mockOnPress} />
    );

    expect(getByText('Annotation')).toBeTruthy();
    expect(getByText('Test Note')).toBeTruthy();
    expect(getByText('This is a test description')).toBeTruthy();

    const dateString = new Date(mockAnnotationNote.createdAt).toLocaleDateString();
    expect(getByText(dateString)).toBeTruthy();

    const card = getByTestId(`note-card-${mockAnnotationNote.id}`);
    expect(card).toBeTruthy();
  });

  it('renders recommendation note correctly', () => {
    const { getByText, queryByText } = render(
      <NoteCard note={mockRecommendationNote} onPress={mockOnPress} />
    );

    expect(getByText('Recommendation')).toBeTruthy();
    expect(getByText('This is a recommendation without title')).toBeTruthy();

    expect(queryByText('Test Note')).toBeNull();

    const dateString = new Date(mockRecommendationNote.createdAt).toLocaleDateString();
    expect(getByText(dateString)).toBeTruthy();
  });

  it('renders images when available', () => {
    const { UNSAFE_getAllByType } = render(
      <NoteCard note={mockAnnotationNote} onPress={mockOnPress} />
    );

    const images = UNSAFE_getAllByType(Image);

    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  it('shows "+X" indicator when there are more than 3 images', () => {
    const { getByText } = render(<NoteCard note={mockNoteWithManyImages} onPress={mockOnPress} />);

    expect(getByText('+2')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const { getByTestId } = render(<NoteCard note={mockAnnotationNote} onPress={mockOnPress} />);

    const card = getByTestId(`note-card-${mockAnnotationNote.id}`);
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
