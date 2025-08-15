import { render, fireEvent } from '@testing-library/react-native';
import { BackButton } from '../index';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'buttons.back': 'Back',
        };
        return translations[key] || key;
      },
    };
  },
}));

jest.mock('@expo/vector-icons', () => ({
  Feather: jest.fn().mockImplementation(() => null),
}));

describe('BackButton Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with back text', () => {
    const { getByText } = render(<BackButton onPress={mockOnPress} />);

    expect(getByText('Back')).toBeTruthy();
  });

  it('calls onPress when the back text is pressed', () => {
    const { getByText } = render(<BackButton onPress={mockOnPress} />);

    const backText = getByText('Back');
    fireEvent.press(backText);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
