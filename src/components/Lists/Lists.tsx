import React, { useState } from 'react'
import NoLists from './NoLists'
import { List, ListItem, Button } from '@ui-kitten/components'
import CreateListModal from './CreateListModal'

export interface List {
    key: string;
    done: boolean;
    archived: boolean;
    name: string;
}

interface ListsProps {
    lists: List[];
}

const Lists = (props: ListsProps) => {
    const compositeListItem = ({ item, index }: { item: List, index: number }) => {
        return (
            <ListItem title={item.name}></ListItem>
        )
    }

    const [visible, setVisible] = useState(false);

    const toggleModal = () => {
        setVisible(!visible);
    }



    console.log(props.lists);
    if (!props.lists.length) {
        return <NoLists />
    } else {
        return (
            <>
                <Button style={{ marginBottom: 32 }} appearance="outline" onPress={toggleModal}>Dodaj listę</Button>
                <CreateListModal visible={visible} dismissModal={toggleModal} />
                <List data={props.lists} renderItem={compositeListItem} />
            </>
        )
    }
}

export default Lists
