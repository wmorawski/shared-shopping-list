import React from 'react';
import {Text, Modal, Input, Button, Layout, Icon} from '@ui-kitten/components';

const CreateListModal = ({
  visible,
  dismissModal,
}: {
  visible: boolean;
  dismissModal: () => void;
}) => {
  const [value, setValue] = React.useState('');

  return (
    <Modal
      visible={visible}
      backdropStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <Layout
        level="3"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          borderRadius: 5,
          padding: 24,
          paddingHorizontal: 32,
          position: 'relative',
          width: 256
        }}>
          <Input
            label="Nazwa listy"
            placeholder="Podaj nazwę listy"
            value={value}
            onChangeText={setValue}></Input>
          <Layout level="3" style={{flexDirection: 'row', flex: 1, width: '100%', alignItems: 'stretch', marginVertical: 16}}>
          <Button style={{flexShrink: 0}} onPress={dismissModal} status="danger">Anuluj</Button>
          <Button style={{marginLeft: 'auto'}} onPress={dismissModal} status="success">Utwórz</Button>
          </Layout>
      </Layout>
    </Modal>
  );
};

export default CreateListModal;
