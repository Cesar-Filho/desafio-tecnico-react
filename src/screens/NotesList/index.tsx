import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Note, NoteCategory } from '~/@types/notes';
import { useAppSelector } from '~/store';

import FloatingAddButton from '~/components/atoms/FloatingAddButton';
import CategoryFilter from '~/components/molecules/CategoryFilter';
import SearchInput from '~/components/atoms/SearchInput';
import EmptyState from '~/components/atoms/EmptyState';
import NoteCard from '~/components/molecules/NoteCard';

import { styles } from './styles';

export default function NotesListScreen() {
  const navigation = useNavigation();
  const notes = useAppSelector((state) => state.notes.notes);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory | 'all'>('all');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const { t } = useTranslation();

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
    <View style={styles.container}>
      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder={t('search.placeholder')}
        accessibilityLabel={t('search.placeholder')}
      />
      <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <FlatList
        data={filteredNotes}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate('NoteForm', { noteId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyState message={t('emptyState.noNotes')} />}
        contentContainerStyle={styles.listContent}
      />
      <FloatingAddButton
        onPress={() => navigation.navigate('NoteForm', { noteId: '' })}
        accessibilityLabel={t('buttons.addNote')}
      />
    </View>
  );
}
