import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View, StyleSheet } from 'react-native';
import { theme } from '~/theme';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.backButton}>
      <Feather name="chevron-left" size={16} color={theme.colors.primaryDark} />
      <Text style={styles.backButtonText} onPress={onPress}>
        {t('buttons.back')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    paddingLeft: theme.spacing.lg,
  },
  backButtonText: {
    color: theme.colors.primaryDark,
    marginLeft: theme.spacing.xs,
  },
});
