import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '~/components/atoms/FormInput';
import { FormPicker } from '~/components/atoms/FormPicker';
import { Button } from '~/components/atoms/Button';
import { ImagePickerGroup } from '~/components/molecules/ImagePickerGroup';
import { NoteFormData } from '~/@types/notes';

interface NoteFormOrganismProps {
  initialValues: Partial<NoteFormData>;
  images: { uri: string }[];
  onSubmit: (data: NoteFormData) => void;
  onPickImage: () => void;
  onRemoveImage: (index: number) => void;
  isEditing: boolean;
}

export const NoteFormOrganism: React.FC<NoteFormOrganismProps> = ({
  initialValues,
  images,
  onSubmit,
  onPickImage,
  onRemoveImage,
  isEditing,
}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NoteFormData>({
    defaultValues: {
      category: initialValues.category || 'annotation',
      title: initialValues.title || '',
      description: initialValues.description || '',
      images: initialValues.images || [],
    },
  });

  const category = watch('category');

  return (
    <View>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <FormPicker
            label={t('form.category')}
            selectedValue={value}
            onValueChange={onChange}
            items={[
              { label: t('categories.annotation'), value: 'annotation' },
              { label: t('categories.recommendation'), value: 'recommendation' },
            ]}
            accessibilityLabel={t('form.category')}
          />
        )}
      />

      <Controller
        control={control}
        name="title"
        rules={{ required: category === 'recommendation' ? t('errors.titleRequired') : false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label={t('form.title')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t('form.titlePlaceholder')}
            error={errors.title?.message as string}
            accessibilityLabel={t('form.title')}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{ required: t('errors.descriptionRequired') }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label={t('form.description')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t('form.descriptionPlaceholder')}
            error={errors.description?.message as string}
            accessibilityLabel={t('form.description')}
            multiline
            numberOfLines={4}
          />
        )}
      />

      <ImagePickerGroup
        images={images}
        onAdd={onPickImage}
        onRemove={onRemoveImage}
        maxImages={5}
        testID="note-form-image-picker"
      />

      <Button
        title={isEditing ? t('form.updateButton') : t('form.createButton')}
        onPress={handleSubmit(onSubmit)}
        accessibilityLabel={isEditing ? t('form.updateButton') : t('form.createButton')}
        testID={isEditing ? 'update-note-button' : 'create-note-button'}
      />
    </View>
  );
};
