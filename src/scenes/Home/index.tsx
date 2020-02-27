import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Layout, Spinner } from '@ui-kitten/components';
import Products from '../../components/Products/Products';


export const HomeScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const alignItems = products.length ? 'stretch' : 'center';

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .orderBy('createdAt', 'desc')
      .where('deleted', '==', false)
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot);
          const products = querySnapshot.docs.map(doc => {
            return {
              ...doc.data(),
              key: doc.id
            }
          })
  
          setProducts(products)
          if (loading) {
            setLoading(false)
          }

      })
    return () => unsubscribe();
  }, []);


  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems }}>
      {loading ? <Spinner size="giant" /> : <Products products={products} />}
    </Layout>
  );
};
