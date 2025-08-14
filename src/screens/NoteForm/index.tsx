import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, type StaticScreenProps } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

import { useAppDispatch, useAppSelector } from '~/store';
import { NoteFormTemplate } from '~/components/templates/NoteFormTemplate';
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

  const [images, setImages] = useState<{ uri: string }[]>([]);

  const initialValues: Partial<NoteFormData> = {
    category: note?.category || 'annotation',
    title: note?.title || '',
    description: note?.description || '',
    images: note?.images || [],
  };

  useEffect(() => {
    if (note) {
      setImages(note.images);
    }
  }, [note]);

  const handleSubmit = (data: NoteFormData) => {
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

  const handlePickImage = async () => {
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

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <NoteFormTemplate
      initialValues={initialValues}
      images={images}
      onSubmit={handleSubmit}
      onPickImage={handlePickImage}
      onRemoveImage={handleRemoveImage}
      isEditing={!!noteId}
    />
  );
}
