import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      form: {
        category: 'Category',
        title: 'Title',
        titlePlaceholder: 'Enter title',
        description: 'Description',
        descriptionPlaceholder: 'Enter description',
        images: 'Images',
        addImage: 'Add Image',
        createButton: 'Create Note',
        updateButton: 'Update Note',
      },
      categories: {
        annotation: 'Note',
        recommendation: 'Recommendation',
      },
      filters: {
        all: 'All',
      },
      buttons: {
        addNote: 'Add Note',
        back: 'Back',
      },
      search: {
        placeholder: 'Search notes...',
      },
      emptyState: {
        noNotes: 'No notes found',
      },
      errors: {
        titleRequired: 'Title is required for recommendations',
        descriptionRequired: 'Description is required',
        maxImages: 'Maximum 5 images allowed',
      },
    },
  },
  pt: {
    translation: {
      form: {
        category: 'Categoria',
        title: 'Título',
        titlePlaceholder: 'Digite o título',
        description: 'Descrição',
        descriptionPlaceholder: 'Digite a descrição',
        images: 'Imagens',
        addImage: 'Adicionar Imagem',
        createButton: 'Criar Nota',
        updateButton: 'Atualizar Nota',
      },
      categories: {
        annotation: 'Nota',
        recommendation: 'Recomendação',
      },
      filters: {
        all: 'Todas',
      },
      buttons: {
        addNote: 'Adicionar Nota',
        back: 'Voltar',
      },
      search: {
        placeholder: 'Buscar notas...',
      },
      emptyState: {
        noNotes: 'Nenhuma nota encontrada',
      },
      errors: {
        titleRequired: 'Título é obrigatório para recomendações',
        descriptionRequired: 'Descrição é obrigatória',
        maxImages: 'Máximo de 5 imagens permitidas',
      },
    },
  },
};

i18n.default.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n.default;
