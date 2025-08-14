import React from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet } from 'react-native';

import { theme } from '~/theme';

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
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },
});
