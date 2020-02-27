import React, { useState } from 'react'
import { Text, Button } from '@ui-kitten/components'
import CreateProductModal from './CreateProductModal';

const NoProducts = () => {
    const [visible, setVisible] = useState(false);

    const toggleModal = () => {
        setVisible(!visible);
    }

    return (
        <>
        <Text category="h1">Brak produktów na liście</Text>
        <Button style={{marginVertical: 16, width: '80%'}} appearance="outline" size="large" onPress={toggleModal}>Dodaj produkt</Button>
        <CreateProductModal visible={visible} dismissModal={toggleModal} />
        </>
    )
}

export default NoProducts
