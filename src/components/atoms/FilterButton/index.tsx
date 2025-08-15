import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  accessibilityLabel: string;
  testID?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#EEEEEE',
    marginRight: 4,
    alignItems: 'center',
  },
  active: { backgroundColor: '#4CAF50' },
  text: { color: '#212121' },
  textActive: { color: '#FFFFFF', fontWeight: 'bold' },
});
