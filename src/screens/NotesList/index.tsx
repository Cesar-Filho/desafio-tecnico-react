import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Note, NoteCategory } from '~/@types/notes';
import { useAppSelector } from '~/store';

import NotesListTemplate from '~/components/templates/NotesListTemplate';

export default function NotesListScreen() {
  const navigation = useNavigation();
  const notes = useAppSelector((state) => state.notes.notes);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory | 'all'>('all');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: t('headerTitle.list') });
  }, [navigation, t]);

  useEffect(() => {
    let result = [...notes];
    if (selectedCategory !== 'all') {
      result = result.filter((note) => note.category === selectedCategory);
    }
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      result = result.filter(
        (note) =>
          (note.title && note.title.toLowerCase().includes(lowerSearch)) ||
          note.description.toLowerCase().includes(lowerSearch)
      );
    }
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setFilteredNotes(result);
  }, [notes, selectedCategory, searchText]);

  return (
    <NotesListTemplate
      notes={filteredNotes}
      searchText={searchText}
      onSearchChange={setSearchText}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      onNotePress={(noteId) => navigation.navigate('NoteForm', { noteId })}
      onAddPress={() => navigation.navigate('NoteForm', { noteId: '' })}
      addButtonAccessibilityLabel={t('buttons.addNote')}
    />
  );
}
