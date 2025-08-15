import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from '../index';

describe('SearchInput Component', () => {
  const mockValue = 'test search';
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided value', () => {
    const { getByDisplayValue } = render(
      <SearchInput value={mockValue} onChangeText={mockOnChangeText} />
    );

    expect(getByDisplayValue(mockValue)).toBeTruthy();
  });

  it('calls onChangeText when text is changed', () => {
    const { getByDisplayValue } = render(
      <SearchInput value={mockValue} onChangeText={mockOnChangeText} />
    );

    const input = getByDisplayValue(mockValue);
    fireEvent.changeText(input, 'new value');

    expect(mockOnChangeText).toHaveBeenCalledWith('new value');
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  it('renders with placeholder when provided', () => {
    const mockPlaceholder = 'Search...';
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={mockOnChangeText} placeholder={mockPlaceholder} />
    );

    expect(getByPlaceholderText(mockPlaceholder)).toBeTruthy();
  });

  it('uses the provided accessibilityLabel', () => {
    const { getByLabelText } = render(
      <SearchInput
        value={mockValue}
        onChangeText={mockOnChangeText}
        accessibilityLabel="Search input field"
      />
    );

    expect(getByLabelText('Search input field')).toBeTruthy();
  });

  it('passes additional TextInput props', () => {
    const testID = 'custom-test-id';
    const { getByTestId } = render(
      <SearchInput value={mockValue} onChangeText={mockOnChangeText} testID={testID} />
    );

    expect(getByTestId(testID)).toBeTruthy();
  });
});
