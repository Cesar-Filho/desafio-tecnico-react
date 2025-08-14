import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Note } from '~/@types/notes';
import { useTranslation } from 'react-i18next';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
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
    marginBottom: 12,
    elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  category: { fontWeight: 'bold', color: '#007AFF' },
  date: { color: '#888', fontSize: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  description: { color: '#333', marginBottom: 6 },
  images: { flexDirection: 'row', marginTop: 8 },
  thumbnail: { width: 40, height: 40, borderRadius: 6, marginRight: 4 },
  moreIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  moreText: { color: '#007AFF', fontWeight: 'bold' },
});

export default NoteCard;
