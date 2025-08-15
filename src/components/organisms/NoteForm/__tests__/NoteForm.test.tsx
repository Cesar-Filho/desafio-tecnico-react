import React from 'react';
import { render } from '@testing-library/react-native';
import { NoteFormOrganism } from '../index';
import { NoteFormData } from '~/@types/notes';

jest.mock('~/components/atoms/FormInput', () => ({
  FormInput: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/atoms/FormPicker', () => ({
  FormPicker: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/atoms/Button', () => ({
  Button: jest.fn().mockImplementation(() => null),
}));

jest.mock('~/components/molecules/ImagePickerGroup', () => ({
  ImagePickerGroup: jest.fn().mockImplementation(() => null),
}));

jest.mock('react-hook-form', () => {
  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        category: 'annotation',
        title: '',
        description: '',
      })
  );

  return {
    Controller: ({ name, render }: any) => {
      return render({
        field: {
          onChange: jest.fn(),
          onBlur: jest.fn(),
          value: name === 'category' ? 'annotation' : '',
        },
        fieldState: { error: null },
        formState: { errors: {} },
      });
    },
    useForm: () => {
      return {
        control: {
          _defaultValues: {
            category: 'annotation',
            title: '',
            description: '',
          },
        },
        handleSubmit,
        formState: { errors: {} },
        watch: () => 'annotation',
        getValues: () => ({
          category: 'annotation',
          title: '',
          description: '',
        }),
      };
    },
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'form.category': 'Category',
        'form.title': 'Title',
        'form.description': 'Description',
        'form.titlePlaceholder': 'Enter title',
        'form.descriptionPlaceholder': 'Enter description',
        'form.createButton': 'Create Note',
        'form.updateButton': 'Update Note',
        'categories.annotation': 'Annotation',
        'categories.recommendation': 'Recommendation',
        'errors.titleRequired': 'Title is required',
        'errors.descriptionRequired': 'Description is required',
      };
      return translations[key] || key;
    },
  }),
}));

describe('NoteFormOrganism Component', () => {
  const mockInitialValues: Partial<NoteFormData> = {
    category: 'annotation',
    title: '',
    description: '',
    images: [],
  };

  const mockImages = [
    { uri: 'https://example.com/image1.jpg' },
    { uri: 'https://example.com/image2.jpg' },
  ];

  const mockOnSubmit = jest.fn();
  const mockOnPickImage = jest.fn();
  const mockOnRemoveImage = jest.fn();

  let FormInput: jest.Mock;
  let FormPicker: jest.Mock;
  let ImagePickerGroup: jest.Mock;
  let Button: jest.Mock;
  let handleSubmit: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    FormInput = jest.requireMock('~/components/atoms/FormInput').FormInput;
    FormPicker = jest.requireMock('~/components/atoms/FormPicker').FormPicker;
    ImagePickerGroup = jest.requireMock('~/components/molecules/ImagePickerGroup').ImagePickerGroup;
    Button = jest.requireMock('~/components/atoms/Button').Button;
    handleSubmit = jest.requireMock('react-hook-form').useForm().handleSubmit;
  });

  it('renders form fields with correct props', () => {
    render(
      <NoteFormOrganism
        initialValues={mockInitialValues}
        images={mockImages}
        onSubmit={mockOnSubmit}
        onPickImage={mockOnPickImage}
        onRemoveImage={mockOnRemoveImage}
        isEditing={false}
      />
    );

    expect(FormPicker).toHaveBeenCalledTimes(1);
    expect(FormPicker.mock.calls[0][0]).toMatchObject({
      label: 'Category',
      selectedValue: 'annotation',
      items: expect.arrayContaining([
        { label: 'Annotation', value: 'annotation' },
        { label: 'Recommendation', value: 'recommendation' },
      ]),
    });

    const titleInputCall = FormInput.mock.calls.find((call) => call[0].label === 'Title');
    expect(titleInputCall).toBeTruthy();
    expect(titleInputCall[0]).toMatchObject({
      label: 'Title',
      placeholder: 'Enter title',
    });

    const descriptionInputCall = FormInput.mock.calls.find(
      (call) => call[0].label === 'Description'
    );
    expect(descriptionInputCall).toBeTruthy();
    expect(descriptionInputCall[0]).toMatchObject({
      label: 'Description',
      placeholder: 'Enter description',
      multiline: true,
      numberOfLines: expect.any(Number),
    });

    expect(ImagePickerGroup).toHaveBeenCalledTimes(1);
    expect(ImagePickerGroup.mock.calls[0][0]).toMatchObject({
      images: mockImages,
      onAdd: mockOnPickImage,
      onRemove: mockOnRemoveImage,
      testID: 'note-form-image-picker',
    });

    const createButtonCall = Button.mock.calls.find(
      (call) => call[0].testID === 'create-note-button'
    );
    expect(createButtonCall).toBeTruthy();
    expect(createButtonCall[0]).toMatchObject({
      title: 'Create Note',
      testID: 'create-note-button',
    });
  });

  it('renders update button when isEditing is true', () => {
    render(
      <NoteFormOrganism
        initialValues={mockInitialValues}
        images={mockImages}
        onSubmit={mockOnSubmit}
        onPickImage={mockOnPickImage}
        onRemoveImage={mockOnRemoveImage}
        isEditing={true}
      />
    );

    const updateButtonCall = Button.mock.calls.find(
      (call) => call[0].testID === 'update-note-button'
    );

    expect(updateButtonCall).toBeTruthy();
    expect(updateButtonCall[0]).toMatchObject({
      title: 'Update Note',
      testID: 'update-note-button',
    });
  });

  it('submits form when button is pressed', async () => {
    const buttonHandlers: Record<string, () => void> = {};

    Button.mockImplementation(({ onPress, testID }) => {
      buttonHandlers[testID] = onPress;
      return null;
    });

    render(
      <NoteFormOrganism
        initialValues={mockInitialValues}
        images={mockImages}
        onSubmit={mockOnSubmit}
        onPickImage={mockOnPickImage}
        onRemoveImage={mockOnRemoveImage}
        isEditing={false}
      />
    );

    const createButtonHandler = buttonHandlers['create-note-button'];
    expect(createButtonHandler).toBeTruthy();

    createButtonHandler();

    expect(handleSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
