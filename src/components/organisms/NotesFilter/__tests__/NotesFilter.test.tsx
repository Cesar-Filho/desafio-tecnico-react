import React from 'react';
import { render } from '@testing-library/react-native';
import { NotesFilter } from '../index';

jest.mock('~/components/atoms/SearchInput', () => ({
  SearchInput: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/molecules/CategoryFilter', () => ({
  CategoryFilter: jest.fn().mockImplementation(() => null),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'search.placeholder': 'Search notes...',
        };
        return translations[key] || key;
      },
    };
  },
}));

describe('NotesFilter Component', () => {
  const mockSearchText = '';
  const mockOnSearchChange = jest.fn();
  const mockSelectedCategory = 'all';
  const mockOnCategoryChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders components with correct props', () => {
    render(
      <NotesFilter
        searchText={mockSearchText}
        onSearchChange={mockOnSearchChange}
        selectedCategory={mockSelectedCategory}
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const searchInputMock = jest.requireMock('~/components/atoms/SearchInput').SearchInput;
    expect(searchInputMock.mock.calls[0][0]).toEqual({
      value: mockSearchText,
      onChangeText: mockOnSearchChange,
      placeholder: 'Search notes...',
      accessibilityLabel: 'Search notes...',
    });

    const categoryFilterMock = jest.requireMock(
      '~/components/molecules/CategoryFilter'
    ).CategoryFilter;
    expect(categoryFilterMock.mock.calls[0][0]).toEqual({
      selectedCategory: mockSelectedCategory,
      onSelectCategory: mockOnCategoryChange,
    });
  });
});
