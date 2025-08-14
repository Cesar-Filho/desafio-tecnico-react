import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Note } from '~/@types/notes';
import { useTranslation } from 'react-i18next';

import { NoteCard } from '~/components/molecules/NoteCard';
import { EmptyState } from '~/components/atoms/EmptyState';

interface NotesListProps {
  notes: Note[];
  onNotePress: (noteId: string) => void;
  contentContainerStyle?: object;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onNotePress,
  contentContainerStyle,
}) => {
  const { t } = useTranslation();

  return (
    <FlatList
      data={notes}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <NoteCard note={item} onPress={() => onNotePress(item.id)} />}
      initialNumToRender={10}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyState message={t('emptyState.noNotes')} />}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
  },
});
