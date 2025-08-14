import { StyleSheet } from 'react-native';
import { theme } from '~/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
});
