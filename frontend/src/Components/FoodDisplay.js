import React, { useContext } from 'react'
import {StoreContext} from '../Context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div>
        <h1 className='font-medium text-lg md:text-2xl mt-2 md:mt-7 mb-5 xl:text-3xl'>Top Dishes Near You</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 gap-y-12 mx-2 md:mx-0'>
           {
            food_list.map((item,index)=>{
              if(category === 'All' || category === item.category)
                {
                  return (<FoodItem key={index} id={item._id} name={item.name} img={item.image} price={item.price} desc={item.description} 
                  category={item.category} />)
                }
                return null;
             
            })
           }
        
        </div>
    </div>
  )
}

export default FoodDisplay