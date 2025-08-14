import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '~/components/atoms/BackButton';
import NotesListScreen from '~/screens/NotesList';
import NoteFormScreen from '~/screens/NoteForm';

const Stack = createStackNavigator({
  screens: {
    NotesList: {
      screen: NotesListScreen,
      options: { title: 'Listagem' },
    },
    NoteForm: {
      screen: NoteFormScreen,
      options: ({ navigation }) => ({
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
        title: 'Formulário',
      }),
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList {}
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
