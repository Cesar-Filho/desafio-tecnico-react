import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Note } from '~/@types/notes';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={`${note.category} ${note.title || ''}`}
      testID={`note-card-${note.id}`}>
      <View style={styles.header}>
        <Text style={styles.category}>
          {note.category === 'annotation'
            ? t('categories.annotation')
            : t('categories.recommendation')}
        </Text>
        <Text style={styles.date}>{new Date(note.createdAt).toLocaleDateString()}</Text>
      </View>
      {note.title && <Text style={styles.title}>{note.title}</Text>}
      <Text style={styles.description} numberOfLines={2}>
        {note.description}
      </Text>
      {note.images.length > 0 && (
        <View style={styles.images}>
          {note.images.slice(0, 3).map((image, idx) => (
            <Image
              key={idx}
              source={{ uri: image.uri }}
              style={styles.thumbnail}
              accessibilityLabel={`Image ${idx + 1}`}
            />
          ))}
          {note.images.length > 3 && (
            <View style={styles.moreIndicator}>
              <Text style={styles.moreText}>+{note.images.length - 3}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  category: { fontWeight: 'bold', color: '#4CAF50' },
  date: { color: '#757575', fontSize: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  description: { color: '#757575', marginBottom: 4 },
  images: { flexDirection: 'row', marginTop: 4 },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 4,
  },
  moreIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  moreText: { color: '#388E3C', fontWeight: 'bold' },
});
