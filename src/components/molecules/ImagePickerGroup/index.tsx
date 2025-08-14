import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ImageThumbnail } from '~/components/atoms/ImageThumbnail';
import { Button } from '~/components/atoms/Button';
import { theme } from '~/theme';

interface ImagePickerGroupProps {
  images: { uri: string }[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxImages?: number;
  testID?: string;
}

export const ImagePickerGroup: React.FC<ImagePickerGroupProps> = ({
  images,
  onAdd,
  onRemove,
  maxImages = 5,
  testID = 'image-picker-group',
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>
        {t('form.images')} ({images.length}/{maxImages})
      </Text>
      <View style={styles.wrapper}>
        <Button
          title={t('form.addImage')}
          onPress={onAdd}
          accessibilityLabel={t('form.addImage')}
          testID={`${testID}-add-button`}
          style={styles.addButton}
        />
      </View>
      <View style={styles.imagesContainer}>
        {images.map((image, idx) => (
          <ImageThumbnail
            key={idx}
            uri={image.uri}
            onRemove={() => onRemove(idx)}
            accessibilityLabel={t('form.removeImage')}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  addButton: {
    borderRadius: theme.radius.sm,
  },
  wrapper: {
    width: '50%',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.md,
  },
});
