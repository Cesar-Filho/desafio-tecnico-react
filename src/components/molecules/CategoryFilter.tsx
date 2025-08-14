import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NoteCategory } from '~/@types/notes';
import { useTranslation } from 'react-i18next';
import { theme } from '~/theme';

interface CategoryFilterProps {
  selectedCategory: NoteCategory | 'all';
  onSelectCategory: (category: NoteCategory | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selectedCategory === 'all' && styles.active]}
        onPress={() => onSelectCategory('all')}
        accessibilityLabel={t('filters.all')}
        testID="filter-all">
        <Text style={[styles.text, selectedCategory === 'all' && styles.textActive]}>
          {t('filters.all')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedCategory === 'annotation' && styles.active]}
        onPress={() => onSelectCategory('annotation')}
        accessibilityLabel={t('categories.annotation')}
        testID="filter-annotation">
        <Text style={[styles.text, selectedCategory === 'annotation' && styles.textActive]}>
          {t('categories.annotation')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedCategory === 'recommendation' && styles.active]}
        onPress={() => onSelectCategory('recommendation')}
        accessibilityLabel={t('categories.recommendation')}
        testID="filter-recommendation">
        <Text style={[styles.text, selectedCategory === 'recommendation' && styles.textActive]}>
          {t('categories.recommendation')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 12 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundGray,
    marginRight: 8,
    alignItems: 'center',
  },
  active: { backgroundColor: theme.colors.primary },
  text: { color: theme.colors.text },
  textActive: { color: theme.colors.white, fontWeight: 'bold' },
});

export default CategoryFilter;
