import React, { useState } from 'react'
import { Text, Button } from '@ui-kitten/components'
import CreateListModal from './CreateListModal';

const NoLists = () => {
    const [visible, setVisible] = useState(false);

    const toggleModal = () => {
        setVisible(!visible);
    }

    return (
        <>
        <Text category="h1">Brak list zakupów</Text>
        <Button style={{marginVertical: 16, width: '80%'}} appearance="outline" size="large" onPress={toggleModal}>Utwórz listę</Button>
        <CreateListModal visible={visible} dismissModal={toggleModal} />
        </>
    )
}

export default NoLists
