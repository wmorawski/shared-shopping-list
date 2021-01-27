import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';

import {
  ApplicationProvider,
  IconRegistry,
  Spinner,
} from '@ui-kitten/components';
import {dark, light, mapping} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './src/navigations/main.navigation';
import auth from '@react-native-firebase/auth';
import {LoginScreen} from './src/scenes/Auth/Login';
import {theme} from './theme';

declare var global: {HermesInternal: null | {}};
export const themes: {[key: string]: any} = {light, dark};

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    initializing && setInitializing(false);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        {initializing ? <Spinner /> : user ? <AppNavigator /> : <LoginScreen />}
      </ApplicationProvider>
    </>
  );
};

export default App;
