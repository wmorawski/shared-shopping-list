import React, {useState} from 'react';
import NoProducts from './NoProducts';
import {List, Button, ListItem, useTheme, Icon} from '@ui-kitten/components';
import FirestoreService, {Product, Store} from '../../services/firestore.service';
import { useNavigation } from '@react-navigation/native';

export interface ProductOnList {
  key?: string;
  bought: boolean;
  store: Store;
  product: Product;
  quantity: number;
  deleted?: boolean;
  createdAt?: number;
}

interface ProductsProps {
  navigation: any;
  products: ProductOnList[];
}

const ProductsOnList = (props: ProductsProps) => {
  const service = new FirestoreService();
  const theme = useTheme();
  const navigation = useNavigation();

  const productListItem = ({item}: {item: ProductOnList}) => {
    const renderItemIcon = (style: any) => (
      <Icon
        {...style}
        name={item.bought ? 'checkmark-circle' : 'close-circle-outline'}
        fill={
          item.bought ? theme['color-success-400'] : theme['color-danger-400']
        }
      />
    );
    const productListItemAccessory = (style: any) => {
      const actionIcon = (style: any) => (
        <Icon {...style} name={item.bought ? 'close' : 'checkmark'} />
      );
      const deleteIcon = (style: any) => <Icon {...style} name="trash" />;
      const toggleBought = () => {
        service.toggleItemBought(item.key as string, !item.bought);
      };
      const removeItem = () => {
        service.removeItem(item.key as string);
      };

      return (
        <>
          <Button
            {...style}
            status={item.bought ? 'warning' : 'success'}
            style={{marginRight: 8}}
            size="tiny"
            icon={actionIcon}
            onPress={toggleBought}
          />
          <Button
            {...style}
            size="tiny"
            status="danger"
            icon={deleteIcon}
            onPress={removeItem}
          />
        </>
      );
    };
    return (
      <ListItem
        title={`${item.product.name} (x${item.quantity})`}
        description={item.store.name}
        icon={renderItemIcon}
        accessory={productListItemAccessory}
      />
    );
  };

  if (!props.products.length) {
    return <NoProducts navigation={props.navigation} />;
  } else {
    return (
      <>
        <Button
          style={{marginBottom: 32}}
          appearance="outline"
          onPress={() => navigation.navigate('ProductAdd')}>
          Dodaj produkt
        </Button>
        <List data={props.products} renderItem={productListItem} />
      </>
    );
  }
};

export default ProductsOnList;
