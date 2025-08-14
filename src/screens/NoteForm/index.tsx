import { useEffect, useState } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation, type StaticScreenProps } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

import { useAppDispatch, useAppSelector } from '~/store';

import { styles } from './styles';
import { FormInput } from '~/components/atoms/FormInput';
import { FormPicker } from '~/components/atoms/FormPicker';
import { ImagePickerGroup } from '~/components/molecules/ImagePickerGroup';
import { NoteFormData } from '~/@types/notes';
import { NotesActions } from '~/store/slices/notes';

type Props = StaticScreenProps<{
  noteId: string;
}>;

export default function NoteFormScreen({ route }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { noteId } = route?.params || {};
  const notes = useAppSelector((state) => state.notes.notes);
  const note = notes.find((n) => n.id === noteId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NoteFormData>({
    defaultValues: {
      category: 'annotation',
      title: '',
      description: '',
      images: [],
    },
  });

  const [images, setImages] = useState<{ uri: string }[]>([]);

  useEffect(() => {
    if (note) {
      reset({
        category: note.category,
        title: note.title,
        description: note.description,
        images: note.images,
      });
      setImages(note.images);
    }
  }, [note, reset]);

  const onSubmit = (data: NoteFormData) => {
    try {
      const now = new Date().toISOString();

      if (noteId && note) {
        dispatch(
          NotesActions.updateNote({
            ...data,
            id: noteId,
            images,
            createdAt: note.createdAt,
            updatedAt: now,
          })
        );
      } else {
        dispatch(
          NotesActions.addNote({
            ...data,
            id: uuidv4(),
            images,
            createdAt: now,
            updatedAt: now,
          })
        );
      }

      navigation.goBack();
    } catch (error) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('Error submitting note form:', error);
      }
    }
  };

  const pickImage = async () => {
    if (images.length >= 5) {
      Alert.alert(t('errors.maxImages'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, { uri: result.assets[0].uri }]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const category = watch('category');

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <ImagePickerGroup images={images} onAdd={pickImage} onRemove={removeImage} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>
          {noteId ? t('form.updateButton') : t('form.createButton')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
