import React from 'react';
import {Store} from '../../services/firestore.service';
import {List, ListItem} from '@ui-kitten/components';

export const StoresList = ({stores}: {stores: Store[]}) => {
  const renderItem = ({item}: {item: Store}) => <ListItem title={item.name} />;
  return <List data={stores} renderItem={renderItem} />;
};
