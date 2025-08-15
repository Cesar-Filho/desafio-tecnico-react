import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  accessibilityLabel?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  ...rest
}) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    accessibilityLabel={accessibilityLabel}
    {...rest}
  />
);

const styles = StyleSheet.create({
  input: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    color: '#212121',
    marginBottom: 16,
    fontSize: 16,
  },
});
