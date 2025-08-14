import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import { ScreenContent } from '~/components/templates/ScreenContent';
import { Button } from '~/components/atoms/Button';

export default function NotesListScreen() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <ScreenContent path="screens/overview.tsx" title="Overview"></ScreenContent>
      <Button onPress={() => navigate('NoteForm', { isEdit: false })} title="Show Details" />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
