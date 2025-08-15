import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Note, NoteCategory } from '~/@types/notes';

import { FloatingAddButton } from '~/components/atoms/FloatingAddButton';
import { NotesFilter } from '~/components/organisms/NotesFilter';
import { NotesList } from '~/components/organisms/NotesList';
import LanguageToggle from '~/components/atoms/LanguageToggle';

interface NotesListTemplateProps {
  notes: Note[];
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedCategory: NoteCategory | 'all';
  onCategoryChange: (category: NoteCategory | 'all') => void;
  onNotePress: (noteId: string) => void;
  onAddPress: () => void;
  onLanguageToggle: () => void;
  addButtonAccessibilityLabel: string;
  languageToggleAccessibilityLabel?: string;
}

const NotesListTemplate: React.FC<NotesListTemplateProps> = ({
  notes,
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onNotePress,
  onAddPress,
  onLanguageToggle,
  addButtonAccessibilityLabel,
  languageToggleAccessibilityLabel,
}) => {
  return (
    <View style={styles.container}>
      <LanguageToggle
        onPress={onLanguageToggle}
        accessibilityLabel={languageToggleAccessibilityLabel}
      />
      <View style={styles.header}>
        <View style={styles.filterContainer}>
          <NotesFilter
            searchText={searchText}
            onSearchChange={onSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </View>
      </View>
      <NotesList notes={notes} onNotePress={onNotePress} />
      <FloatingAddButton onPress={onAddPress} accessibilityLabel={addButtonAccessibilityLabel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 12,
  },
  filterContainer: {
    flex: 1,
  },
});

export default NotesListTemplate;
