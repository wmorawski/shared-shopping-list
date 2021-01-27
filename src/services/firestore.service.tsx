import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {ProductOnList} from 'src/components/ProductsOnList/ProductsOnList';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const collectionName = 'productsOnList';

type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : (T[P] | undefined)
};

export type Product = {
  createdAt: number;
  timesUsed: number;
  name: string;
  user: Pick<FirebaseAuthTypes.User, 'displayName' | 'photoURL'>;
  key?: string;
};

export type Store = {
  name: string;
  key?: string;
  timesUsed: number;
};

class FirestoreService {
  private collection = firestore().collection(collectionName);

  addItemToList(item: ProductOnList) {
    return this.collection.add(item);
  }

  removeItem(key: string) {
    return this.collection.doc(key).update({deleted: true});
  }

  toggleItemBought(key: string, bought: boolean) {
    return this.collection.doc(key).update({bought});
  }
}

export const mapWithId = (
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot,
) => ({...doc.data(), key: doc.id});

export const getStores = () =>
  firestore()
    .collection('stores')
    .orderBy('timesUsed', 'desc');

export const getProducts = () =>
  firestore()
    .collection('products')
    .orderBy('timesUsed', 'desc');

export const addProduct = (item: Product) =>
  firestore()
    .collection('products')
    .add(item);

export const addStore = (item: Store) =>
  firestore()
    .collection('stores')
    .add(item);

export const countUpItem = (
  collection: string,
  key: string,
  currentCount: number,
) =>
  firestore()
    .collection(collection)
    .doc(key)
    .update({timesUsed: currentCount + 1});

export const updateUserToken = (
    user: Partial< FirebaseAuthTypes.User>,
    token: string
) => firestore().collection('devices').add({user, token});

export default FirestoreService;
