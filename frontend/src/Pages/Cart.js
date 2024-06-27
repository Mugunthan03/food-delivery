import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import {useNavigate} from 'react-router-dom'


const Cart = () => {
  const {cartItems, removeFromCart,food_list,totalCartAmount,url} = useContext(StoreContext)
  const navigate = useNavigate()
  return (
    <div className='pt-10 pb-10'>

      <div className='grid  pb-5 pt-5 gap-5 text-xs md:text-lg 'style={{gridTemplateColumns:'1fr 1.5fr 1fr 1fr 1fr 0.5fr'}}>
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className='border-none bg-[#e2e2e2] m-1 h-1  mx-auto' />
      <div className='pt-5 '>
      {
        food_list.map((item,index)=>{
          if(cartItems[item._id] > 0)
            {
          return <div><div className='grid pt-5 gap-5 items-center ' style={{gridTemplateColumns:'1fr 1.5fr 1fr 1fr 1fr 0.5fr'}}>               
                <img src={url+'/images/'+item.image} alt='food' className='w-28 rounded-xl' />
                <p className='xl:text-lg'>{item.name}</p>
                <p className='xl:text-lg' >₹{item.price}</p>
                <p className='xl:text-lg'>{cartItems[item._id]}</p>
                <p>₹{item.price*cartItems[item._id]}</p>
                <p className='cursor-pointer text-xl xl:text-2xl' onClick={()=>removeFromCart(item._id)}>x</p>
            </div>
            <hr className='border-none bg-[#e2e2e2] m-3 h-1   mx-auto' />
            </div>            
            }            
           
        })       
      }
    </div>

    <div className='flex justify-between flex-wrap gap-20 xl:gap-80 flex-grow pt-5 md:pt-20 '>

      <div className='flex-grow order-2 md:order-1 '>
        <h1 className='text-xl font-bold xl:text-2xl'>Cart Totals</h1>
        <div className='flex justify-between text-gray-400 mt-5'>
          <h1>SubTotal</h1>
          <p>₹{totalCartAmount()}</p>
        </div>
        <div className='flex justify-between text-gray-400 mt-5'>
          <h1>Delivery Fee</h1>
          <p>₹{totalCartAmount() === 0?'0':'30'}</p>
        </div>
        <div className='flex justify-between font-bold text-lg mt-5'>
          <h1>Total</h1>
          <p>₹{totalCartAmount()===0?'0':totalCartAmount() + 30}</p>
        </div>
        <button className='mt-5 bg-[#E96F56] p-2 text-white rounded-md text-sm xl:text-base'
         onClick={()=>navigate('/order')}>Proceed to Checkout</button>
      </div>


      <div className='flex flex-col flex-wrap pt-2 order-1 md:order-2'>
        <h1 className='text-gray-400'>If you have a promo code. Enter Here</h1>
        <div className='pt-5'>
        <input type='text' placeholder='promo code' className='bg-gray-300 p-2 outline-none text-sm' />
        <button className='bg-black text-white p-2 outline-none text-sm'>Submit</button>

        </div>

      </div>

    </div>






    </div>
 
  )
}

export default Cart