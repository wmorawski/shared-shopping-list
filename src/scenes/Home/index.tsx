import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import Lists from '../../components/Lists/Lists';


export const HomeScreen = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = firestore()
    .collection('lists')
    .onSnapshot((querySnapshot) => {
      console.log(querySnapshot)
      const lists = querySnapshot.docs.map(doc => {
        return {
          ...doc.data(),
          key: doc.id
        }
      })

      setLists(lists)
      if(loading) {
        setLoading(false)
      }
    })
    return () => unsubscribe();
  }, []);

  const result = () => {
    console.log(loading);
    if(loading) {
      return <Spinner size="giant" />
    } else {
      return <Lists lists={lists} />;
    }
  }

  return (
      <Layout>
        {result()}
      </Layout>
  );
};
