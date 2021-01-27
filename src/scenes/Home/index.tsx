import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Layout, Spinner} from '@ui-kitten/components';
import ProductsOnList from '../../components/ProductsOnList/ProductsOnList';
import {mapWithId} from '../../services/firestore.service';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const alignItems = products.length ? 'stretch' : 'center';

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('productsOnList')
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const products = querySnapshot.docs.map(mapWithId);
        setProducts(products);
        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, [loading]);

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems,
        paddingHorizontal: 8,
      }}>
      {loading ? (
        <Spinner size="giant" />
      ) : (
        <ProductsOnList navigation={navigation} products={products} />
      )}
    </Layout>
  );
};
