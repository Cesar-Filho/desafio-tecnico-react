import type { StaticScreenProps } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import { ScreenContent } from '~/components/templates/ScreenContent';

type Props = StaticScreenProps<{
  isEdit: boolean;
}>;

export default function NoteFormScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <ScreenContent
        path="screens/details.tsx"
        title={`Showing details for user ${route.params?.isEdit ? 'Editing' : 'Creating'} Note`}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
