import { StyleSheet } from 'react-native';
import { theme } from '~/theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
});
