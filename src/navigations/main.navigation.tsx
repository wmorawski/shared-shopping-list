import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../scenes/Home';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import {StoresScreen} from '../scenes/Stores/index';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductAddScreen} from '../scenes/Product/Add';
import auth from '@react-native-firebase/auth';
import {AddStoreModal} from '../scenes/Stores/AddStoreModal';
import CreateProductModal from '../scenes/Product/List/CreateProductModal';
import {ProductListScreen} from '../scenes/Product/List';

const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}: {navigation: any; state: any}) => {
  const onSelect = (index: any) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={onSelect}
        appearance="noIndicator">
        <BottomNavigationTab
          icon={style => <Icon {...style} name="home-outline" />}
          title="Lista"
        />
        <BottomNavigationTab
          icon={style => <Icon {...style} name="plus-outline" />}
          title="Dodaj"
        />
        <BottomNavigationTab
          icon={style => <Icon {...style} name="pricetags-outline" />}
          title="Produkty"
        />
        <BottomNavigationTab
          icon={style => <Icon {...style} name="shopping-cart-outline" />}
          title="Sklepy"
        />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const HomeNavigator = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="ProductAdd" component={ProductAddScreen} />
    <BottomTab.Screen name="Products" component={ProductListScreen} />
    <BottomTab.Screen name="Stores" component={StoresScreen} />
  </BottomTab.Navigator>
);

const HomeNavigation = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator mode="modal">
      <HomeStack.Screen
        name="Main"
        component={HomeNavigator}
        options={{
          headerTitle: 'Grocify',
          headerRight: LogoutButton,
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="AddStoreModal"
        component={AddStoreModal}
        options={{title: 'Dodaj sklep'}}
      />
      <HomeStack.Screen
        name="CreateProductModal"
        component={CreateProductModal}
        options={{title: 'Utwórz nowy produkt'}}
      />
    </HomeStack.Navigator>
  );
};

const logout = () => auth().signOut();

const LogoutButton = () => [
  <TopNavigationAction
    onPress={logout}
    key="logoutButton"
    icon={style => <Icon {...style} name="log-out" />}
  />,
];

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <HomeNavigation />
    </NavigationContainer>
  );
};
