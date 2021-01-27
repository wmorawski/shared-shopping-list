import React from 'react';
import {Button, Input, Layout} from '@ui-kitten/components';
import * as yup from 'yup';
import {Formik} from 'formik';
import {addStore} from '../../services/firestore.service';

export interface AddStoreFormValues {
  name: string;
}

const initialValues = {
  name: '',
};

const validationSchema = yup.object().shape<AddStoreFormValues>({
  name: yup
    .string()
    .required()
    .min(2),
});

export const AddStoreModal = () => {
  const handleCreate = (values: AddStoreFormValues, fns: any) => {
    addStore({
      ...values,
      timesUsed: 0,
    }).then(() => fns.resetForm());
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
              label="Nazwa sklepu"
              placeholder="Podaj nazwę sklepu"
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
