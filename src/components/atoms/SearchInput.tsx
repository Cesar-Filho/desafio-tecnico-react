import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '~/theme';

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  accessibilityLabel?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
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
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.white,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.white,
    color: theme.colors.text,
    fontSize: 16,
  },
});

export default SearchInput;
