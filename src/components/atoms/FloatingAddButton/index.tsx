import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FloatingAddButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
}

export const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({
  onPress,
  accessibilityLabel,
}) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    testID="add-note-button">
    <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 32,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
