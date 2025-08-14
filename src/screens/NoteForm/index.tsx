import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useNavigation, type StaticScreenProps } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import { useAppDispatch, useAppSelector } from '~/store';

import { styles } from './styles';
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
      if (noteId && note) {
        dispatch(
          NotesActions.updateNote({
            ...data,
            id: noteId,
            images,
            createdAt: note.createdAt,
            updatedAt: new Date().toISOString(),
          })
        );
      } else {
        dispatch(NotesActions.addNote({ ...data, images }));
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
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('form.category')}</Text>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
              accessibilityLabel={t('form.category')}>
              <Picker.Item label={t('categories.annotation')} value="annotation" />
              <Picker.Item label={t('categories.recommendation')} value="recommendation" />
            </Picker>
          </View>
        )}
      />

      <Controller
        control={control}
        name="title"
        rules={{ required: category === 'recommendation' ? t('errors.titleRequired') : false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('form.title')}</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={t('form.titlePlaceholder')}
              accessibilityLabel={t('form.title')}
            />
            {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{ required: t('errors.descriptionRequired') }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('form.description')}</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
              placeholder={t('form.descriptionPlaceholder')}
              accessibilityLabel={t('form.description')}
            />
            {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {t('form.images')} ({images.length}/5)
        </Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>{t('form.addImage')}</Text>
        </TouchableOpacity>

        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.uri }} style={styles.imageThumbnail} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
                accessibilityLabel={t('form.removeImage')}>
                <Text style={styles.removeImageButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>
          {noteId ? t('form.updateButton') : t('form.createButton')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
