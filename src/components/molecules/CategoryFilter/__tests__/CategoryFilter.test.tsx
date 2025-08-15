import React from 'react';
import { render } from '@testing-library/react-native';
import { CategoryFilter } from '../index';

jest.mock('~/components/atoms/FilterButton', () => ({
  FilterButton: jest.fn().mockImplementation(() => null),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'filters.all': 'All',
          'categories.annotation': 'Annotation',
          'categories.recommendation': 'Recommendation',
        };
        return translations[key] || key;
      },
    };
  },
}));

describe('CategoryFilter Component', () => {
  const mockOnSelectCategory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all category filters', () => {
    render(<CategoryFilter selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

    const filterButtonMock = jest.requireMock('~/components/atoms/FilterButton').FilterButton;

    expect(filterButtonMock).toHaveBeenCalledTimes(3);

    const calls = filterButtonMock.mock.calls;
    const labels = calls.map((call: any[]) => call[0].label);

    expect(labels).toContain('All');
    expect(labels).toContain('Annotation');
    expect(labels).toContain('Recommendation');
  });

  it('calls onSelectCategory with "all" when All filter is pressed', () => {
    render(
      <CategoryFilter selectedCategory="annotation" onSelectCategory={mockOnSelectCategory} />
    );

    const filterButtonMock = jest.requireMock('~/components/atoms/FilterButton').FilterButton;
    const calls = filterButtonMock.mock.calls;

    const allFilterCall = calls.find((call: any[]) => call[0].testID === 'filter-all');
    expect(allFilterCall).toBeTruthy();

    allFilterCall[0].onPress();

    expect(mockOnSelectCategory).toHaveBeenCalledWith('all');
  });

  it('calls onSelectCategory with "annotation" when Annotation filter is pressed', () => {
    render(<CategoryFilter selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

    const filterButtonMock = jest.requireMock('~/components/atoms/FilterButton').FilterButton;
    const calls = filterButtonMock.mock.calls;

    const annotationFilterCall = calls.find(
      (call: any[]) => call[0].testID === 'filter-annotation'
    );
    expect(annotationFilterCall).toBeTruthy();

    annotationFilterCall[0].onPress();

    expect(mockOnSelectCategory).toHaveBeenCalledWith('annotation');
  });

  it('calls onSelectCategory with "recommendation" when Recommendation filter is pressed', () => {
    render(<CategoryFilter selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

    const filterButtonMock = jest.requireMock('~/components/atoms/FilterButton').FilterButton;
    const calls = filterButtonMock.mock.calls;

    const recommendationFilterCall = calls.find(
      (call: any[]) => call[0].testID === 'filter-recommendation'
    );
    expect(recommendationFilterCall).toBeTruthy();

    recommendationFilterCall[0].onPress();

    expect(mockOnSelectCategory).toHaveBeenCalledWith('recommendation');
  });

  it('sets isActive to true for the selected category', () => {
    render(
      <CategoryFilter selectedCategory="recommendation" onSelectCategory={mockOnSelectCategory} />
    );

    const filterButtonMock = jest.requireMock('~/components/atoms/FilterButton').FilterButton;
    const calls = filterButtonMock.mock.calls;

    const allFilterCall = calls.find((call: any[]) => call[0].testID === 'filter-all');
    const annotationFilterCall = calls.find(
      (call: any[]) => call[0].testID === 'filter-annotation'
    );
    const recommendationFilterCall = calls.find(
      (call: any[]) => call[0].testID === 'filter-recommendation'
    );

    expect(allFilterCall[0].isActive).toBe(false);
    expect(annotationFilterCall[0].isActive).toBe(false);
    expect(recommendationFilterCall[0].isActive).toBe(true);
  });
});
