import React from 'react';
import {Text, Button} from '@ui-kitten/components';

const NoProducts = ({navigation}: {navigation: any}) => {
  return (
    <>
      <Text category="h2">Brak produktów na liście</Text>
      <Button
        style={{marginVertical: 16, width: '80%'}}
        appearance="primary"
        size="large"
        onPress={() => navigation.navigate('ProductAdd')}>
        Dodaj produkt do listy
      </Button>
    </>
  );
};

export default NoProducts;
