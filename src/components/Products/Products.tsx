import React, { useState } from 'react'
import NoProducts from './NoProducts'
import { List, Button, ListItem, useTheme, Icon } from '@ui-kitten/components'
import firestore from '@react-native-firebase/firestore';
import CreateListModal from './CreateProductModal'
import FirestoreService from '../../services/firestore.service';

export interface Product {
    key?: string;
    bought: boolean;
    store: string;
    name: string;
    deleted?: boolean;
    createdAt?: number;
}

interface ProductsProps {
    products: Product[];
}



const Products = (props: ProductsProps) => {
    const service = new FirestoreService();
    const [visible, setVisible] = useState(false);

    const toggleModal = () => {
        setVisible(!visible);
    }
    const theme = useTheme();

    const productListItem = ({ item }: { item: Product }) => {
        const renderItemIcon = (style: any) => (
            <Icon {...style}
                name={item.bought ? 'checkmark-circle' : 'close-circle-outline'}
                fill={item.bought ? theme['color-success-400'] : theme['color-danger-400']}
            />
        );
        const productListItemAccessory = (style: any) => {
            const actionIcon = (style: any) => <Icon {...style } name={item.bought ? 'close' : 'checkmark'} />
            const deleteIcon = (style: any) => <Icon {...style} name='trash' />
            const toggleBought = () => {
                service.toggleItemBought(item.key as string, !item.bought)
            }
            const removeItem = () => {
                service.removeItem(item.key as string);
            }

            return (
                <>
                    <Button {...style} status={item.bought ? 'warning' : 'success'} style={{marginRight: 8}} size="tiny" icon={actionIcon} onPress={toggleBought}></Button>
                    <Button {...style} size="tiny" status='danger' icon={deleteIcon} onPress={removeItem}></Button>
                </>
            )
        }
        return (
            <ListItem title={item.name} description={item.store} icon={renderItemIcon} accessory={productListItemAccessory}></ListItem>
        )
    }

    if (!props.products.length) {
        return <NoProducts />
    } else {
        return (
            <>
                <Button style={{ marginBottom: 32 }} appearance="outline" onPress={toggleModal}>Dodaj produkt</Button>
                <CreateListModal visible={visible} dismissModal={toggleModal} />
                <List data={props.products} renderItem={productListItem} />
            </>
        )
    }
}

export default Products
