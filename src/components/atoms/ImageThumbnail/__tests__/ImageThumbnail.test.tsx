import React from 'react';
import { Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ImageThumbnail } from '../index';

describe('ImageThumbnail Component', () => {
  const mockUri = 'https://example.com/image.jpg';
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with uri', () => {
    const { UNSAFE_getByType } = render(<ImageThumbnail uri={mockUri} />);

    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual({ uri: mockUri });
  });

  it('does not render remove button when onRemove is not provided', () => {
    const { queryByText } = render(<ImageThumbnail uri={mockUri} />);

    expect(queryByText('×')).toBeNull();
  });

  it('renders remove button when onRemove is provided', () => {
    const { getByText } = render(<ImageThumbnail uri={mockUri} onRemove={mockOnRemove} />);

    expect(getByText('×')).toBeTruthy();
  });

  it('calls onRemove when remove button is pressed', () => {
    const { getByText } = render(<ImageThumbnail uri={mockUri} onRemove={mockOnRemove} />);

    const removeButton = getByText('×');
    fireEvent.press(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('uses the provided accessibilityLabel for the remove button', () => {
    const { getByLabelText } = render(
      <ImageThumbnail uri={mockUri} onRemove={mockOnRemove} accessibilityLabel="Remove image" />
    );

    expect(getByLabelText('Remove image')).toBeTruthy();
  });
});
