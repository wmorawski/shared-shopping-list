import React, {useEffect, useState} from 'react';
import {Button, Layout} from '@ui-kitten/components';
import {getStores, mapWithId} from '../../services/firestore.service';
import {StoresList} from './StoresList';
import {NoStores} from './NoStores';
import {useNavigation} from '@react-navigation/native';

export const StoresScreen = () => {
  const [stores, setStores] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = getStores().onSnapshot(querySnapshot =>
      setStores(querySnapshot.docs.map(mapWithId)),
    );
    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();

  return (
    <>
      {stores.length ? (
        <>
          <Button
            style={{marginHorizontal: 8, marginVertical: 16}}
            onPress={() => navigation.navigate('AddStoreModal')}>
            Dodaj sklep
          </Button>
          <StoresList stores={stores} />
        </>
      ) : (
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <NoStores />
        </Layout>
      )}
    </>
  );
};
