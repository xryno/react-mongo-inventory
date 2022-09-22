
import React from 'react';


export const Item = (props) => {

  const getContent = async () =>{

    const res = await fetch ("http://localhost:3000/item/" + props.item._id)
    const data = await res.json()
    props.setSelectedItem(data)
  
    
}
  

  return <>
 
  <div className="w-60 border-solid p-2 bg-white text-center rounded-md m-2 border border-slate-300 shadow-md flex flex-col" onClick={getContent}>
    <h5 className="font-bold">{props.item.title}</h5>
    <h4>£{props.item.price}</h4>
    
    <img className="max-h-56 scale-50" src={props.item.image} />
    
   
    </div>

   
  </>
} 

