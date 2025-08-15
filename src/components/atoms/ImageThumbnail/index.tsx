import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

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
    marginRight: 8,
    marginBottom: 8,
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#D32F2F',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
});
