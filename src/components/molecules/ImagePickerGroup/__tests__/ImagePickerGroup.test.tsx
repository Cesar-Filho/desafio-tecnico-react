import React from 'react';
import { render } from '@testing-library/react-native';
import { ImagePickerGroup } from '../index';

jest.mock('~/components/atoms/ImageThumbnail', () => ({
  ImageThumbnail: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/atoms/Button', () => ({
  Button: jest.fn().mockImplementation(() => null),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'form.images': 'Images',
          'form.addImage': 'Add Image',
          'form.removeImage': 'Remove Image',
        };
        return translations[key] || key;
      },
    };
  },
}));

describe('ImagePickerGroup Component', () => {
  const mockImages = [
    { uri: 'https://example.com/image1.jpg' },
    { uri: 'https://example.com/image2.jpg' },
  ];
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  const { Button } = jest.requireMock('~/components/atoms/Button');
  const { ImageThumbnail } = jest.requireMock('~/components/atoms/ImageThumbnail');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with button and images', () => {
    render(<ImagePickerGroup images={mockImages} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    expect(Button).toHaveBeenCalled();

    expect(ImageThumbnail).toHaveBeenCalledTimes(2);
  });

  it('passes correct props to Button', () => {
    render(<ImagePickerGroup images={mockImages} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    expect(Button).toHaveBeenCalled();

    const buttonProps = Button.mock.calls[0][0];

    expect(buttonProps.onPress).toBe(mockOnAdd);
    expect(buttonProps.title).toBe('Add Image');
    expect(buttonProps.accessibilityLabel).toBe('Add Image');
    expect(buttonProps.testID).toBe('image-picker-group-add-button');
  });

  it('passes correct props to ImageThumbnail', () => {
    render(<ImagePickerGroup images={mockImages} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    expect(ImageThumbnail).toHaveBeenCalledTimes(2);

    const firstThumbnailProps = ImageThumbnail.mock.calls[0][0];

    expect(firstThumbnailProps.uri).toBe('https://example.com/image1.jpg');
    expect(firstThumbnailProps.accessibilityLabel).toBe('Remove Image');
    expect(typeof firstThumbnailProps.onRemove).toBe('function');
  });

  it('sets up onRemove handler correctly', () => {
    render(<ImagePickerGroup images={mockImages} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    const onRemoveHandler = ImageThumbnail.mock.calls[0][0].onRemove;

    onRemoveHandler();

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  it('passes testID prop correctly', () => {
    render(
      <ImagePickerGroup
        images={mockImages}
        onAdd={mockOnAdd}
        onRemove={mockOnRemove}
        testID="custom-picker"
      />
    );

    const buttonProps = Button.mock.calls[0][0];

    expect(buttonProps.testID).toBe('custom-picker-add-button');
  });
});
