import 'react-native-gesture-handler';
import React, {useState} from 'react';

import {
  ApplicationProvider,
  IconRegistry,
  Icon,
  TopNavigationAction,
  TopNavigation,
} from '@ui-kitten/components';
import {mapping, light, dark} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './src/navigations/main.navigation';
import {ThemeContext} from './ThemeContext';


declare var global: {HermesInternal: null | {}};
export const themes: {[key: string]: any} = {light, dark};

const App = () => {
  const [theme, setTheme] = useState('dark');
  const currentTheme = themes[theme];
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const ToggleButton = () => [
    <TopNavigationAction
      onPress={toggleTheme}
      icon={style => (
        <Icon
          {...style}
          fill={theme === 'light' ? currentTheme['color-info-400'] : currentTheme['color-warning-400']}
          name={theme === 'dark' ? 'sun-outline' : 'moon-outline'}
        />
      )}></TopNavigationAction>,
  ];

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <TopNavigation rightControls={ToggleButton()}></TopNavigation>
          <AppNavigator />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
