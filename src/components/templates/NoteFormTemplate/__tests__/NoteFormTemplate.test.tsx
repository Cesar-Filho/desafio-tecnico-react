import React from 'react';
import { render } from '@testing-library/react-native';
import { NoteFormTemplate } from '../index';
import { NoteFormData } from '~/@types/notes';

jest.mock('~/components/organisms/NoteForm', () => ({
  NoteFormOrganism: jest.fn().mockImplementation(() => null),
}));

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.ScrollView = jest.fn(() => null);
  return rn;
});

describe('NoteFormTemplate Component', () => {
  const mockInitialValues: Partial<NoteFormData> = {
    category: 'annotation',
    title: 'Test Title',
    description: 'Test Description',
    images: [],
  };

  const mockImages = [
    { uri: 'https://example.com/image1.jpg' },
    { uri: 'https://example.com/image2.jpg' },
  ];

  const mockOnSubmit = jest.fn();
  const mockOnPickImage = jest.fn();
  const mockOnRemoveImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes correct props to NoteFormOrganism', () => {
    render(
      <NoteFormTemplate
        initialValues={mockInitialValues}
        images={mockImages}
        onSubmit={mockOnSubmit}
        onPickImage={mockOnPickImage}
        onRemoveImage={mockOnRemoveImage}
        isEditing={false}
      />
    );

    const noteFormOrganismMock = jest.requireMock(
      '~/components/organisms/NoteForm'
    ).NoteFormOrganism;

    expect(noteFormOrganismMock).toHaveBeenCalledTimes(1);

    expect(noteFormOrganismMock.mock.calls[0][0]).toEqual({
      initialValues: mockInitialValues,
      images: mockImages,
      onSubmit: mockOnSubmit,
      onPickImage: mockOnPickImage,
      onRemoveImage: mockOnRemoveImage,
      isEditing: false,
    });
  });

  it('passes the isEditing flag correctly', () => {
    render(
      <NoteFormTemplate
        initialValues={mockInitialValues}
        images={mockImages}
        onSubmit={mockOnSubmit}
        onPickImage={mockOnPickImage}
        onRemoveImage={mockOnRemoveImage}
        isEditing={true}
      />
    );

    const noteFormOrganismMock = jest.requireMock(
      '~/components/organisms/NoteForm'
    ).NoteFormOrganism;

    expect(noteFormOrganismMock.mock.calls[0][0].isEditing).toBe(true);
  });
});
