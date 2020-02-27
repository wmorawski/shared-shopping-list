import firestore from '@react-native-firebase/firestore';
import { Product } from 'src/components/Products/Products';

const collectionName = 'products';

class FirestoreService {
    private collection = firestore().collection(collectionName);

    addItem(item: Product) {
        return this.collection.add(item)
    }

    removeItem(key: string) {
        return this.collection.doc(key).set({ deleted: true })
    }

    toggleItemBought(key: string, bought: boolean) {
        return this.collection.doc(key).update({ bought })
    }
}

export default FirestoreService