import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FloatingAddButton } from '../index';

jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: jest.fn().mockImplementation(() => null),
}));

describe('FloatingAddButton Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<FloatingAddButton onPress={mockOnPress} />);

    expect(getByTestId('add-note-button')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const { getByTestId } = render(<FloatingAddButton onPress={mockOnPress} />);

    const button = getByTestId('add-note-button');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('uses the provided accessibilityLabel', () => {
    const { getByLabelText } = render(
      <FloatingAddButton onPress={mockOnPress} accessibilityLabel="Add new note" />
    );

    expect(getByLabelText('Add new note')).toBeTruthy();
  });
});
