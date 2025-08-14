import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '~/theme';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  accessibilityLabel: string;
  testID?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onPress,
  accessibilityLabel,
  testID,
}) => (
  <TouchableOpacity
    style={[styles.button, isActive && styles.active]}
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    testID={testID}>
    <Text style={[styles.text, isActive && styles.textActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.backgroundGray,
    marginRight: theme.spacing.xs,
    alignItems: 'center',
  },
  active: { backgroundColor: theme.colors.primary },
  text: { color: theme.colors.text },
  textActive: { color: theme.colors.white, fontWeight: 'bold' },
});

export default FilterButton;
