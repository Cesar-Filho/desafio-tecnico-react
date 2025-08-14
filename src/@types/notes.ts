export type NoteCategory = 'annotation' | 'recommendation';

export type NoteImage = {
  uri: string;
};

export type Note = {
  id: string;
  category: NoteCategory;
  title?: string;
  description: string;
  images: NoteImage[];
  createdAt: string;
  updatedAt: string;
};

export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
