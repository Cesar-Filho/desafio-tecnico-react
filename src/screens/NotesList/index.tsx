import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, FlatList, Image, TextInput } from 'react-native';

import { useEffect, useState } from 'react';
import { useAppSelector } from '~/store';
import { Note, NoteCategory } from '~/@types/notes';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

export default function NotesListScreen() {
  const navigation = useNavigation();
  const notes = useAppSelector((state) => state.notes.notes);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory | 'all'>('all');
  const [filteredNotes, setFilteredNotes] = useState(notes);
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

  const renderCategoryFilter = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[styles.filterButton, selectedCategory === 'all' && styles.filterButtonActive]}
        onPress={() => setSelectedCategory('all')}
        accessibilityLabel={t('filters.all')}>
        <Text style={[styles.filterText, selectedCategory === 'all' && styles.filterTextActive]}>
          {t('filters.all')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedCategory === 'annotation' && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedCategory('annotation')}
        accessibilityLabel={t('categories.annotation')}>
        <Text
          style={[styles.filterText, selectedCategory === 'annotation' && styles.filterTextActive]}>
          {t('categories.annotation')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedCategory === 'recommendation' && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedCategory('recommendation')}
        accessibilityLabel={t('categories.recommendation')}>
        <Text
          style={[
            styles.filterText,
            selectedCategory === 'recommendation' && styles.filterTextActive,
          ]}>
          {t('categories.recommendation')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('NoteForm', { noteId: item.id })}
      accessibilityLabel={`${item.category} ${item.title || ''}`}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteCategory}>
          {item.category === 'annotation'
            ? t('categories.annotation')
            : t('categories.recommendation')}
        </Text>
        <Text style={styles.noteDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      {item.title && <Text style={styles.noteTitle}>{item.title}</Text>}
      <Text style={styles.noteDescription} numberOfLines={2}>
        {item.description}
      </Text>
      {item.images.length > 0 && (
        <View style={styles.noteImages}>
          {item.images.slice(0, 3).map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.noteImageThumbnail}
              accessibilityLabel={`Image ${index + 1}`}
            />
          ))}
          {item.images.length > 3 && (
            <View style={styles.moreImagesIndicator}>
              <Text style={styles.moreImagesText}>+{item.images.length - 3}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>{t('emptyState.noNotes')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={t('search.placeholder')}
        value={searchText}
        onChangeText={setSearchText}
        accessibilityLabel={t('search.placeholder')}
      />
      {renderCategoryFilter()}
      <FlatList
        data={filteredNotes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NoteForm', {})}
        accessibilityLabel={t('buttons.addNote')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
