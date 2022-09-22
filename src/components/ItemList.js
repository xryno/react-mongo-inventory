import React from 'react';
import { Item } from './Item';

export const ItemList = (props) => {
	return <>
		{
			props.items.map((item, idx) => {
				return <Item item={item} key={idx} setSelectedItem={props.setSelectedItem}/>
			})
		}
	</>
} 




