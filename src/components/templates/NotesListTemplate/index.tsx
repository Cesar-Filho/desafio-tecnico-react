import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Note, NoteCategory } from '~/@types/notes';

import NotesFilter from '~/components/organisms/NotesFilter';
import NotesList from '~/components/organisms/NotesList';
import FloatingAddButton from '~/components/atoms/FloatingAddButton';
import { theme } from '~/theme';

interface NotesListTemplateProps {
  notes: Note[];
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedCategory: NoteCategory | 'all';
  onCategoryChange: (category: NoteCategory | 'all') => void;
  onNotePress: (noteId: string) => void;
  onAddPress: () => void;
  addButtonAccessibilityLabel: string;
}

const NotesListTemplate: React.FC<NotesListTemplateProps> = ({
  notes,
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onNotePress,
  onAddPress,
  addButtonAccessibilityLabel,
}) => {
  return (
    <View style={styles.container}>
      <NotesFilter
        searchText={searchText}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <NotesList notes={notes} onNotePress={onNotePress} />
      <FloatingAddButton onPress={onAddPress} accessibilityLabel={addButtonAccessibilityLabel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
});

export default NotesListTemplate;
