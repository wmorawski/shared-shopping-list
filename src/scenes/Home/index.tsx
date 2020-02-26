import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Layout, Spinner } from '@ui-kitten/components';
import Lists from '../../components/Lists/Lists';


export const HomeScreen = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const alignItems = lists.length ? 'stretch' : 'center';

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('lists')
      .where('archived', '==', false)
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot)
        const lists = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            key: doc.id
          }
        })

        setLists(lists)
        if (loading) {
          setLoading(false)
        }
      })
    return () => unsubscribe();
  }, []);


  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems }}>
      {loading ? <Spinner size="giant" /> : <Lists lists={lists} />}
    </Layout>
  );
};
