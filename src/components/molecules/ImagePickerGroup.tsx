import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ImageThumbnail } from '../atoms/ImageThumbnail';
import { theme } from '~/theme';

interface ImagePickerGroupProps {
  images: { uri: string }[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const ImagePickerGroup: React.FC<ImagePickerGroupProps> = ({ images, onAdd, onRemove }) => {
  const { t } = useTranslation();
  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: theme.colors.text,
          marginBottom: theme.spacing.sm,
        }}>
        {t('form.images')} ({images.length}/5)
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.md,
          borderRadius: theme.radius.sm,
          alignSelf: 'flex-start',
        }}
        onPress={onAdd}>
        <Text style={{ color: theme.colors.white, fontWeight: '500' }}>{t('form.addImage')}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: theme.spacing.md }}>
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
