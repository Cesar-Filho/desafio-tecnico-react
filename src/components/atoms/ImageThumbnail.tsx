import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '~/theme';

interface ImageThumbnailProps {
  uri: string;
  onRemove?: () => void;
  accessibilityLabel?: string;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  uri,
  onRemove,
  accessibilityLabel,
}) => (
  <View style={styles.imageWrapper}>
    <Image source={{ uri }} style={styles.imageThumbnail} />
    {onRemove && (
      <TouchableOpacity
        style={styles.removeImageButton}
        onPress={onRemove}
        accessibilityLabel={accessibilityLabel}>
        <Text style={styles.removeImageButtonText}>×</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  imageWrapper: {
    position: 'relative',
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.lightGray,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
});
