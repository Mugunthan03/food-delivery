import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../Context/StoreContext.js'
import axios from 'axios'
import { assets } from '../assets/assets'

const MyOrder = () => {
    
  const {url,token} = useContext(StoreContext)
  const[data,setData ] = useState([])

  const fetchOrders = async ()=>{
    const response = await axios.post(url+'/api/order/userorders',{},{headers:{token}})
    setData(response.data.data)
    console.log(response.data.data)
   

  }
  useEffect(()=>{
    if(token){
      fetchOrders()
    }
  },[token])

  return (
    <div className='mt-10 mb-10'>
      <div>
        <h1 className='text-xl xl:text-2xl font-medium'>My Orders</h1>
        
        <div className=' mt-8 border-2 p-5 flex flex-col gap-10'>
          {
            data.map((order,index)=>{
              return(
                <div key={index} className='grid grid-cols-3 gap-5 items-center  lg:grid-cols-6' >

                     <img src={assets.parcel_icon} alt='parcel icon' className='w-14 '/>               

                  <h1 className=''>{order.items.map((item,index)=>{
                     if(index === order.items.length-1 )  
                      {
                      return item.name +' x '+ item.quantity
                     }
                     else
                     {
                      return item.name +' x '+ item.quantity+', '
                     }


                  })}</h1>

                  <p>₹ {order.amount}.00 </p>
                  <p className='mt-5 md:mt-0'>Items:{order.items.length}</p>
                  <p className='mt-5 md:mt-0 md:text-base text-xs text-red-400 capitalize'><span className='text-red-500'>&#x25cf;</span> <b>{order.status}</b></p>
                  <button className='bg-orange-400 border-none text-xs w-fit h-fit p-2 mt-4 md:mt-0 md:text-base rounded-md'
                  onClick={fetchOrders}>Track Order</button>


                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MyOrder