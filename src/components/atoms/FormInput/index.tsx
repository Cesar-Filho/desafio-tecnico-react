import React from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  accessibilityLabel?: string;
  multiline?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  accessibilityLabel,
  ...props
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, props.multiline && styles.multilineInput]}
      accessibilityLabel={accessibilityLabel || label}
      {...props}
    />
    {error ? (
      <Text style={styles.error} accessibilityLabel={`Error: ${error}`}>
        {error}
      </Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#BDBDBD',
    borderRadius: 4,
    color: '#212121',
    fontSize: 16,
    padding: 8,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 12,
  },
});
