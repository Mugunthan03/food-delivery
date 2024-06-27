import React, { useContext} from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../Context/StoreContext'

const FoodItem = ({id,name,img,price,desc}) => {
  
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
  return (
    <div className='w-[100%] rounded-xl shadow-lg transition-all duration-300 hover:scale-95 hover:shadow-2xl mt-2 '>
        <div className='relative' >
            <img src={url+'/images/'+img} alt='food' className='w-full rounded-t-lg ' />
            {
                !cartItems[id]?
                <img src={assets.add_icon_white} alt='white icon'  onClick={()=>addToCart(id)} 
                className='absolute bottom-3 right-2 w-9 ' />:
                <div className='flex items-center gap-3 absolute bottom-3 right-2 rounded-full bg-white p-1 '>
                    <img src={assets.remove_icon_red} alt='red icon' className='w-7' onClick={()=>removeFromCart(id) } 
                     />
                    <h1 className='text-xl font-bold '>{cartItems[id]}</h1>
                    <img src={assets.add_icon_green} alt='green icon' className='w-7' onClick={()=>addToCart(id)}   
                 />

                </div>
            }
        </div>
        <div>
            <div className='flex justify-between items-center px-2 mt-2'>
                <p className='font-medium text-lg capitalize lg:text-xl'>{name}</p>
                <img src={assets.rating_starts} alt='star ratings' className='w-[70px]' />
            </div>
            <div className='px-2 pb-2 pt-3'>
                <p className='text-[#676767] text-sm'>{desc}</p>
                <p className='text-[#E86B56] text-xl font-medium mt-2'>₹ {price}</p>
            </div>
        </div>
      
    </div>
  )
}

export default FoodItem