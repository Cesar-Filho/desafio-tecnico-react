import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormInput } from '../index';

describe('FormInput Component', () => {
  it('renders correctly with label', () => {
    const { getByText, getByLabelText } = render(
      <FormInput label="Test Label" value="" onChangeText={() => {}} />
    );

    expect(getByText('Test Label')).toBeTruthy();
    expect(getByLabelText('Test Label')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByLabelText } = render(
      <FormInput label="Input Field" value="" onChangeText={onChangeTextMock} />
    );

    fireEvent.changeText(getByLabelText('Input Field'), 'New text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <FormInput
        label="Error Input"
        value=""
        onChangeText={() => {}}
        error="This is an error message"
      />
    );

    expect(getByText('This is an error message')).toBeTruthy();
  });

  it('does not display error message when error prop is not provided', () => {
    const { queryByText } = render(
      <FormInput label="No Error Input" value="" onChangeText={() => {}} />
    );

    expect(queryByText(/Error:/i)).toBeNull();
  });

  it('applies multiline style when multiline prop is true', () => {
    const { getByLabelText } = render(
      <FormInput
        label="Multiline Input"
        value=""
        onChangeText={() => {}}
        multiline={true}
        numberOfLines={4}
      />
    );

    const input = getByLabelText('Multiline Input');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(4);
  });

  it('uses custom accessibilityLabel when provided', () => {
    const { getByLabelText } = render(
      <FormInput
        label="Input Label"
        value=""
        onChangeText={() => {}}
        accessibilityLabel="Custom Accessibility Label"
      />
    );

    expect(getByLabelText('Custom Accessibility Label')).toBeTruthy();
  });

  it('calls onBlur when input loses focus', () => {
    const onBlurMock = jest.fn();
    const { getByLabelText } = render(
      <FormInput label="Blur Input" value="" onChangeText={() => {}} onBlur={onBlurMock} />
    );

    fireEvent(getByLabelText('Blur Input'), 'blur');
    expect(onBlurMock).toHaveBeenCalled();
  });
});
