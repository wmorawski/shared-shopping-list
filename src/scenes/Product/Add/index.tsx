import React, {useEffect, useState} from 'react';
import {
  Button,
  Layout,
  Select,
  SelectOptionType,
  SelectOption,
  Input,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as yup from 'yup';
import FirestoreService, {
  countUpItem,
  getProducts,
  getStores,
  Product, Store,
} from '../../../services/firestore.service';

export interface CreateProductFormValues {
  product: string;
  store: string;
  quantity: number;
}

const initialValues = {
  product: '',
  store: '',
  quantity: 1,
};

const validationSchema = yup.object().shape<CreateProductFormValues>({
  product: yup.string().required(),
  store: yup.string().required(),
  quantity: yup.number().required(),
});

const ProductForm = ({
  handleCreate,
  stores,
  products,
}: {
  handleCreate: any;
  stores: any[];
  products: Product[];
}) => {
  const [selectedStore, setSelectedStore] = useState<SelectOption>();
  const [selectedProduct, setSelectedProduct] = useState<SelectOption>();

  const [mappedProducts, setMappedProducts] = useState<SelectOptionType[]>([]);
  const [mappedStores, setMappedStores] = useState<SelectOptionType[]>([]);

  useEffect(() => {
    return setMappedProducts(products.map(product => ({text: product.name})));
  }, [products]);

  useEffect(() => {
    return setMappedStores(stores.map(store => ({text: store.name})));
  }, [stores]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(props, fns) => handleCreate(props, fns, setSelectedProduct, setSelectedStore)}>
      {({
        handleChange,
        handleBlur,
        values,
        setFieldValue,
        handleSubmit,
        errors,
        touched,
      }) => (
        <>
          <Select
            label="Nazwa produktu"
            placeholder="Wybierz produkt"
            data={mappedProducts}
            onSelect={(option: any) => {
              setSelectedProduct(option);
              setFieldValue('product', option.text, true);
            }}
            selectedOption={selectedProduct}
            status={
              errors.product ? 'danger' : touched.product ? 'success' : ''
            }
          />
          <Select
            data={mappedStores}
            selectedOption={selectedStore}
            onSelect={(option: any) => {
              setSelectedStore(option);
              setFieldValue('store', option.text, true);
            }}
            placeholder="Wybierz sklep"
            label="Sklep"
            status={errors.store ? 'danger' : touched.store ? 'success' : ''}
            style={{marginTop: 16}}
          />
          <Input
            label="Ilość produktu"
            placeholder="Podaj ilość (liczbowo)"
            value={values.quantity.toString()}
            keyboardType="numeric"
            onChangeText={text =>
              setFieldValue(
                'quantity',
                parseInt(text.replace(/[^0-9]/g, ''), 10) || '',
                true,
              )
            }
            onBlur={handleBlur('name')}
            status={
              errors.quantity ? 'danger' : touched.quantity ? 'success' : ''
            }
            caption={errors.quantity || ''}
          />
          <Button
            style={{width: '100%', marginVertical: 16}}
            onPress={handleSubmit}
            status="success">
            Dodaj
          </Button>
        </>
      )}
    </Formik>
  );
};

export const ProductAddScreen = ({navigation}: {navigation: any}) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const service = new FirestoreService();
  const handleCreate = (
    values: {product: string; store: string; quantity: number},
    fns: any,
    setStore: any,
    setProduct: any,
  ) => {
    const product = products.find(product => product.name === values.product)!;
    const store = stores.find(store => store.name === values.store)!;
    service
      .addItemToList({
        product,
        store,
        quantity: values.quantity,
        bought: false,
        deleted: false,
        createdAt: Date.now(),
      })
      .then(() => {
        countUpItem('stores', store.key!, store.timesUsed);
        countUpItem('products', product.key!, product.timesUsed);
        fns.resetForm();
        setStore(null);
        setProduct(null);
      });
  };

  useEffect(() => {
    const unsubscribe = getStores().onSnapshot(querySnapshot => {
      const _stores = querySnapshot.docs.map(doc => ({
        ...(doc.data() as Store),
        key: doc.id,
      }));
      setStores(_stores);
      return () => unsubscribe();
    });
  }, []);

  useEffect(() => {
    const unsubscribe = getProducts().onSnapshot(querySnapshot => {
      const _products = querySnapshot.docs.map(doc => ({
        ...(doc.data() as Product),
        key: doc.id,
      }));
      setProducts(_products);
      return () => unsubscribe();
    });
  }, []);

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'stretch',
        paddingHorizontal: 8,
        paddingVertical: 8,
      }}>
      <ProductForm
        handleCreate={handleCreate}
        stores={stores}
        products={products}
      />
      <Button style={{width: '100%'}} onPress={() => navigation.goBack()}>
        Anuluj
      </Button>
    </Layout>
  );
};
