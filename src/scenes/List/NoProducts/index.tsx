import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

export const ListNoProducts = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text category="h2">Brak produktów w bazie</Text>
      <Button onPress={() => navigation.navigate('CreateProductModal')}>
        Dodaj produkt do bazy
      </Button>
    </>
  );
};
