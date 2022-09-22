
import React from 'react';


export const Basket = (props) => {


    const localBasket = JSON.parse(localStorage.getItem('Basket'));
    
    let totalCost = 0
    
    localBasket.map(each => {
       totalCost += each.price
})
   

   

  return <>
 
    <div className="text-left">
        <h1 className="ml-20 mt-5 font-bold">Basket</h1>
        <h2 className="ml-20"></h2>
        <table className="ml-20 mt-20 border">
            <th className="bg-slate-800 text-white pl-1" >Product</th> <th className="bg-slate-800 text-white pl-1" >Price</th>
            
        {localBasket.map((each, index) => (
            <tr className="bg-slate-200"><td className="p-1 border border-slate-300">{each.title}</td><td className='pl-1 border border-slate-300'>£{each.price.toFixed(2)}</td></tr>
        ))}

       <tr className="bg-slate-500 text-white"><td className="pl-1 font-bold">Total</td><td className=" pl-1 font-bold">£{totalCost.toFixed(2)}</td></tr> 

        </table>
    </div>

   
  </>
} 