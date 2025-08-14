import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NoteCategory } from '~/@types/notes';
import { useTranslation } from 'react-i18next';

import { SearchInput } from '~/components/atoms/SearchInput';
import { CategoryFilter } from '~/components/molecules/CategoryFilter';
import { theme } from '~/theme';

interface NotesFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedCategory: NoteCategory | 'all';
  onCategoryChange: (category: NoteCategory | 'all') => void;
}

export const NotesFilter: React.FC<NotesFilterProps> = ({
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <SearchInput
        value={searchText}
        onChangeText={onSearchChange}
        placeholder={t('search.placeholder')}
        accessibilityLabel={t('search.placeholder')}
      />
      <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={onCategoryChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
});
