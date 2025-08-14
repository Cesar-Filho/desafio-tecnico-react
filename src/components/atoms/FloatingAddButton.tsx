import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '~/theme';

interface FloatingAddButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onPress, accessibilityLabel }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    testID="add-note-button">
    <MaterialCommunityIcons name="plus" size={24} color={theme.colors.white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xxl,
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

export default FloatingAddButton;
