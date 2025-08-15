import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View, StyleSheet } from 'react-native';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.backButton}>
      <Feather name="chevron-left" size={16} color="#388E3C" />
      <Text style={styles.backButtonText} onPress={onPress}>
        {t('buttons.back')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    paddingLeft: 24,
  },
  backButtonText: {
    color: '#388E3C',
    marginLeft: 4,
  },
});
