import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type LanguageToggleProps = {
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
};

export default function LanguageToggle({
  onPress,
  testID = 'language-toggle-button',
  accessibilityLabel,
}: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
      <TouchableOpacity
        style={[styles.containerButton, currentLanguage === 'en' && styles.active]}
        onPress={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel || `Switch to EN language`}>
        <Text style={styles.text}>EN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.containerButton, currentLanguage === 'pt' && styles.active]}
        onPress={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel || `Switch to PT language`}>
        <Text style={styles.text}>PT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  active: { backgroundColor: '#4CAF50' },
});
