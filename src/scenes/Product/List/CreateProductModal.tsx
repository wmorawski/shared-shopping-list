import React from 'react';
import {Input, Button, Layout} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {addProduct} from '../../../services/firestore.service';
import auth from '@react-native-firebase/auth';

export interface CreateProductFormValues {
  name: string;
}

const initialValues = {
  name: '',
};

const validationSchema = yup.object().shape<CreateProductFormValues>({
  name: yup
    .string()
    .required()
    .min(2),
});

const CreateProductModal = () => {
  const {displayName, photoURL} = auth().currentUser!;
  const handleCreate = (values: CreateProductFormValues, fns: any) => {
    addProduct({
      ...values,
      createdAt: Date.now(),
      timesUsed: 0,
      user: {displayName, photoURL},
    }).then(() => {
      fns.resetForm();
    });
  };

  return (
    <Layout style={{flex: 1, paddingVertical: 8, paddingHorizontal: 8}}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreate}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Input
              label="Nazwa produktu"
              placeholder="Podaj nazwę produktu"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              status={errors.name ? 'danger' : touched.name ? 'success' : ''}
              caption={errors.name || ''}
            />
            <Button
              style={{marginTop: 16}}
              onPress={handleSubmit}
              status="success">
              Dodaj
            </Button>
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateProductModal;
