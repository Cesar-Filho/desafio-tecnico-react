import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../index';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Test Button" />);

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Clickable Button" onPress={onPressMock} />);

    fireEvent.press(getByText('Clickable Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders with secondary variant styles', () => {
    const { getByText } = render(<Button title="Secondary Button" variant="secondary" />);

    const buttonText = getByText('Secondary Button');
    expect(buttonText).toBeTruthy();
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(<Button title="Custom Style Button" style={customStyle} />);

    expect(getByText('Custom Style Button')).toBeTruthy();
  });

  it('respects accessibilityLabel prop', () => {
    const { getByLabelText } = render(
      <Button title="Accessible Button" accessibilityLabel="Accessibility Label" />
    );

    expect(getByLabelText('Accessibility Label')).toBeTruthy();
  });

  it('respects testID prop', () => {
    const { getByTestId } = render(<Button title="Test ID Button" testID="test-button" />);

    expect(getByTestId('test-button')).toBeTruthy();
  });

  it('disables the button when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Disabled Button" onPress={onPressMock} disabled={true} />
    );

    fireEvent.press(getByText('Disabled Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
