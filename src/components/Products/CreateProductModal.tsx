import React from 'react';
import { Modal, Input, Button, Layout } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as yup from 'yup';
import FirestoreService from '../../services/firestore.service';

export interface CreateProductFormValues {
  name: string;
  store: string;
}

const initialValues = {
  name: '',
  store: ''
}

const validationSchema = yup.object().shape<CreateProductFormValues>({
  name: yup.string().required().min(2),
  store: yup.string().required().min(2)
})

const CreateProductModal = ({
  visible,
  dismissModal,
}: {
  visible: boolean;
  dismissModal: () => void;
}) => {
  const service = new FirestoreService();
  const handleCreate = (values: { name: string, store: string }, fns: any) => {
    service.addItem({ ...values, bought: false, deleted: false, createdAt: Date.now() }).then(() => {
      fns.resetForm()
    })
  };


  return visible ? (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreate}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <Input
            label="Nazwa produktu"
            placeholder="Podaj nazwę produktu"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            status={errors.name ? 'danger' : touched.name ? 'success' : ''}
            caption={errors.name ? errors.name : ''}
            />
          <Input
            label="Nazwa sklepu"
            placeholder="Podaj nazwę sklepu"
            value={values.store}
            onChangeText={handleChange('store')}
            onBlur={handleBlur('store')}
            status={errors.store ? 'danger' : touched.store ? 'success' : ''}
            caption={errors.store ? errors.store : ''}
            />
          <Layout style={{ flexDirection: 'row', flex: 1, width: '100%', alignItems: 'stretch', marginVertical: 16 }}>
            <Button style={{ flexShrink: 0 }} onPress={dismissModal} status="danger">Anuluj</Button>
            <Button style={{ marginLeft: 'auto' }} onPress={handleSubmit} status="success">Dodaj</Button>
          </Layout>
        </>
      )}
    </Formik>
  ) : null;
};

export default CreateProductModal;
