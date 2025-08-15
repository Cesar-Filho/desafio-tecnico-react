import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

jest.mock('react-redux', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  return {
    Provider: ({ children }) => children,
    useDispatch: () => mockDispatch,
    useSelector: mockSelector,
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'images',
  },
}));

jest.mock('~/store', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(),
}));
