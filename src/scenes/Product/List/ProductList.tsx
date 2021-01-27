import React from 'react';
import {Product} from '../../../services/firestore.service';
import {List, ListItem} from '@ui-kitten/components';
import {Image} from 'react-native';

export const ProductList = ({products}: {products: Product[]}) => {
  const renderItem = ({item}: {item: Product}) => (
    <ListItem
      title={item.name}
      icon={() => (
        <Image
          style={{width: 16, height: 16, borderRadius: 8}}
          source={{uri: item.user.photoURL!}}
        />
      )}
    />
  );
  return <List data={products} renderItem={renderItem} />;
};
