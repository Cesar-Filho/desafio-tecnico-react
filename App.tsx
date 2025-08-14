import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { useMemo } from 'react';

import { persistor, store } from '~/store';
import { NotesSync } from '~/components/atoms/NotesSync';
import Navigation from './src/navigation';

import 'react-native-gesture-handler';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotesSync />
        <Navigation theme={theme} />
      </PersistGate>
    </Provider>
  );
}
