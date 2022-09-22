import React, {useState} from "react";
import { Item } from './Item';

export const ItemDetails = (props) => {

    const [isEditing, setIsEditing] = useState(false)
    const { title, price, image, description, _id} = props.selectedItem
    const [edTitle, setEdTitle] = useState(props.selectedItem.title)
    const [edPrice, setEdPrice] = useState(props.selectedItem.price)
    const [edImage, setEdImage] = useState(props.selectedItem.image)
    const [edDesc, setEdDesc] = useState(props.selectedItem.description)



    const deletePage = async () => {
        props.setSelectedItem(null)
       
        await fetch("http://localhost:3000/" + props.selectedItem._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }) 
}

const addToBasket = ()=> {

    props.setBasket([...props.basket, props.selectedItem])
    localStorage.setItem("Basket",  JSON.stringify([...props.basket, props.selectedItem]))

    console.log(localStorage.getItem('Basket'))

}

const handleSubmit = async () => {

    const resp =  await fetch("http://localhost:3000/", {
        method: 'PUT',
        body: JSON.stringify({title: edTitle, price: parseFloat(edPrice), image: edImage, description: edDesc, id: _id}),
        headers: {
            'Content-Type': 'application/json'
        }
        })


}

    return <>

    <div className={`flex flex-row justify-center content-center `}>
        <div className="mt-5 w-2/4">
        <button onClick={()=> props.setSelectedItem(false)} className="bg-slate-700 hover:bg-slate-500 text-white  w-34 mt-2 px-2 rounded mb-2">Back to all items</button>
            <h1>{title}</h1>
            
            <h2>£{price.toFixed(2)}</h2>
            <img className="rounded h-auto mb-5 mx-auto w-[300px]" src={image}/>
            <h3>{description}</h3>
            <button className="bg-slate-700 hover:bg-slate-500 text-white  w-34 m-2 px-2 rounded mb-2" onClick={deletePage}>Delete</button>
            <button className="bg-slate-700 hover:bg-slate-500 text-white  w-34 m-2 px-2 rounded mb-2" onClick={addToBasket}>Add to basket</button>
            <button className="bg-slate-700 hover:bg-slate-500 text-white  w-34 m-2 px-2 rounded mb-2" onClick={()=>setIsEditing(!isEditing)}>Edit</button>
            
           
            <form className={`${!isEditing && "scale-0"} duration-300`}>
            <br />
            <input className="mb-2 rounded p-1 w-80" type="text" value={edTitle} onChange={(e)=> setEdTitle(e.target.value)}/>
            <br />
            <input className="mb-2 rounded p-1 w-80" type="text" value={edPrice} onChange={(e)=> setEdPrice(e.target.value)}/>
            <br />
            <input className="mb-2 rounded p-1 w-80"type="text" value={edImage} onChange={(e)=> setEdImage(e.target.value)}/>
            <br />
            <input className="mb-2 rounded p-1 w-80" type="text" value={edDesc} onChange={(e)=> setEdDesc(e.target.value)}/>
            <br />
            <button className="bg-slate-700 hover:bg-slate-500 text-white  w-34 m-2 px-2 rounded mb-2" onClick={handleSubmit}>Submit changes</button>
            </form>
           
       
       
       
       
       
        </div>

        
    </div>
 
    </>
}