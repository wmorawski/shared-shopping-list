import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../scenes/Home';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {ArchiveScreen} from '../scenes/Archive/index';


const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}: {navigation: any, state: any}) => {
  const onSelect = (index: any) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={onSelect}>
        <BottomNavigationTab icon={(style) => <Icon {...style} name='home-outline' />} />
        <BottomNavigationTab icon={(style) => <Icon {...style} name='trash-outline' />} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const HomeNavigator = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="Archive" component={ArchiveScreen} />
  </BottomTab.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
