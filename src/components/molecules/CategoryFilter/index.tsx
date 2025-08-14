import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NoteCategory } from '~/@types/notes';
import { useTranslation } from 'react-i18next';

import { FilterButton } from '~/components/atoms/FilterButton';

interface CategoryFilterProps {
  selectedCategory: NoteCategory | 'all';
  onSelectCategory: (category: NoteCategory | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <FilterButton
        label={t('filters.all')}
        isActive={selectedCategory === 'all'}
        onPress={() => onSelectCategory('all')}
        accessibilityLabel={t('filters.all')}
        testID="filter-all"
      />
      <FilterButton
        label={t('categories.annotation')}
        isActive={selectedCategory === 'annotation'}
        onPress={() => onSelectCategory('annotation')}
        accessibilityLabel={t('categories.annotation')}
        testID="filter-annotation"
      />
      <FilterButton
        label={t('categories.recommendation')}
        isActive={selectedCategory === 'recommendation'}
        onPress={() => onSelectCategory('recommendation')}
        accessibilityLabel={t('categories.recommendation')}
        testID="filter-recommendation"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
});
