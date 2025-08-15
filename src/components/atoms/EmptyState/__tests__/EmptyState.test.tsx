import { render } from '@testing-library/react-native';
import { EmptyState } from '../index';

describe('EmptyState Component', () => {
  it('renders correctly with the provided message', () => {
    const message = 'No items found';
    const { getByText } = render(<EmptyState message={message} />);

    expect(getByText(message)).toBeTruthy();
  });

  it('applies the correct styling to the text', () => {
    const message = 'No data available';
    const { getByText } = render(<EmptyState message={message} />);

    const textElement = getByText(message);
    const textStyles = textElement.props.style;

    expect(textStyles).toEqual(
      expect.objectContaining({
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
      })
    );
  });
});
