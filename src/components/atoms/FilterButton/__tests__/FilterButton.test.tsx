import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FilterButton } from '../index';

describe('FilterButton Component', () => {
  const mockLabel = 'Filter Option';
  const mockOnPress = jest.fn();
  const mockAccessibilityLabel = 'Filter option button';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(
      <FilterButton
        label={mockLabel}
        isActive={false}
        onPress={mockOnPress}
        accessibilityLabel={mockAccessibilityLabel}
      />
    );

    expect(getByText(mockLabel)).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const { getByText } = render(
      <FilterButton
        label={mockLabel}
        isActive={false}
        onPress={mockOnPress}
        accessibilityLabel={mockAccessibilityLabel}
      />
    );

    const button = getByText(mockLabel);
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies active styles when isActive is true', () => {
    const { getByTestId } = render(
      <FilterButton
        label={mockLabel}
        isActive={true}
        onPress={mockOnPress}
        accessibilityLabel={mockAccessibilityLabel}
        testID="filter-button"
      />
    );

    const button = getByTestId('filter-button');
    const buttonStyles = button.props.style;

    expect(buttonStyles).toMatchObject(expect.objectContaining({ backgroundColor: '#4CAF50' }));
  });

  it('applies inactive styles when isActive is false', () => {
    const { getByTestId } = render(
      <FilterButton
        label={mockLabel}
        isActive={false}
        onPress={mockOnPress}
        accessibilityLabel={mockAccessibilityLabel}
        testID="filter-button"
      />
    );

    const button = getByTestId('filter-button');
    const buttonStyles = button.props.style;

    expect(buttonStyles).toMatchObject(expect.objectContaining({ backgroundColor: '#EEEEEE' }));
  });

  it('applies active text styles when isActive is true', () => {
    const { getByText } = render(
      <FilterButton
        label={mockLabel}
        isActive={true}
        onPress={mockOnPress}
        accessibilityLabel={mockAccessibilityLabel}
      />
    );

    const text = getByText(mockLabel);
    const textStyles = text.props.style;

    expect(
      textStyles.some(
        (style: { color?: string; fontWeight?: string }) =>
          style.color === '#FFFFFF' && style.fontWeight === 'bold'
      )
    ).toBe(true);
  });

  it('uses the provided accessibilityLabel', () => {
    const { getByLabelText } = render(
      <FilterButton
        label={mockLabel}
        isActive={false}
        onPress={mockOnPress}
        accessibilityLabel={mockAccessibilityLabel}
      />
    );

    expect(getByLabelText(mockAccessibilityLabel)).toBeTruthy();
  });
});
