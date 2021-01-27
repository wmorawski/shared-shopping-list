import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

export const NoStores = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text category="h2">Brak sklepów w bazie</Text>
      <Button onPress={() => navigation.navigate('AddStoreModal')}>
        Dodaj sklep
      </Button>
    </>
  );
};
