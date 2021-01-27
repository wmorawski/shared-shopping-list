import React, {useEffect, useState} from 'react';
import {getProducts, mapWithId} from '../../../services/firestore.service';
import {ListNoProducts} from '../../List/NoProducts';
import {Button, Layout} from '@ui-kitten/components';
import {ProductList} from './ProductList';
import {useNavigation} from '@react-navigation/native';

export const ProductListScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = getProducts().onSnapshot(querySnapshot =>
      setProducts(querySnapshot.docs.map(mapWithId)),
    );
    return () => unsubscribe();
  }, []);
  return (
    <>
      {products.length ? (
        <>
          <Button
            style={{marginHorizontal: 8, marginVertical: 16}}
            onPress={() => navigation.navigate('CreateProductModal')}>
            Dodaj produkt
          </Button>
          <ProductList products={products} />
        </>
      ) : (
        <Layout
          style={{
            flex: 1,
            paddingHorizontal: 8,
            paddingVertical: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ListNoProducts />
        </Layout>
      )}
    </>
  );
};
