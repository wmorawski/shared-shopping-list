import React from 'react'
import NoLists from './NoLists'
import { List, ListItem } from '@ui-kitten/components'

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
    const compositeListItem = ({ item, index }: {item: List, index: number}) => {
        return (
            <ListItem title={item.name}></ListItem>
        )
    }
    

    console.log(props.lists);
    if(!props.lists.length) {
        return <NoLists />
    } else {
        return <List data={props.lists} renderItem={compositeListItem} />
    }
}

export default Lists
