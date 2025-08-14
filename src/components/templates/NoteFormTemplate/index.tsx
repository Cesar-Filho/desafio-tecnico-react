import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NoteFormData } from '~/@types/notes';
import { NoteFormOrganism } from '~/components/organisms';
import { theme } from '~/theme';

interface NoteFormTemplateProps {
  initialValues: Partial<NoteFormData>;
  images: { uri: string }[];
  onSubmit: (data: NoteFormData) => void;
  onPickImage: () => void;
  onRemoveImage: (index: number) => void;
  isEditing: boolean;
}

export const NoteFormTemplate: React.FC<NoteFormTemplateProps> = ({
  initialValues,
  images,
  onSubmit,
  onPickImage,
  onRemoveImage,
  isEditing,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NoteFormOrganism
        initialValues={initialValues}
        images={images}
        onSubmit={onSubmit}
        onPickImage={onPickImage}
        onRemoveImage={onRemoveImage}
        isEditing={isEditing}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
});
