import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {assets} from '../assets/assets'




const Order = ({url}) => {

  const [orders,setOrders] = useState([])

  const fetchOrders = async ()=>{
    const response = await axios.get(url+'/api/order/list')
    if(response.data.success)
      {
        setOrders(response.data.data)
        console.log(response.data.data)
      }
     else{
      toast.error('Error ')
     } 
    
   
  }

  const statusHandler = async(event,orderId)=>{
   const response = await axios.post(url+'/api/order/status',{
    orderId,
    status:event.target.value,
    
   })
   if(response.data.success){
     await fetchOrders()
   }
   }

  useEffect(()=>{
    fetchOrders()
  },[])

  const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata', // Indian time zone
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', options);
};

  return (
    <div className='w-full h-screen mx-3 '>
      <div>
        <h1 className='text-xl font-medium'>Orders</h1>
        <div className='flex flex-col gap-3 mt-5' >
          {
            orders.map((order,index)=>{
                return(
                  <div key={index} className='border-2 grid items-start p-3 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' >

                    <img src={assets.parcel_icon} alt='order' />
                    <div>
                    <p className='font-bold'>
                        {
                          order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                              return item.name + ' x '+ item.quantity
                            }
                            else
                            {
                              return item.name + 'x ' + item.quantity + ' ,'
                            }
                          })
                        }
                      </p>
                      <p className='mt-5 capitalize text-orange-600'>{order.address.firstName + ' ' + order.address.lastName}</p>
                      <p className='text-gray-500'>{order.address.street}</p>
                       <div className='text-gray-500 capitalize'>
                      <p>{order.address.city + ','+ order.address.state + ','+order.address.country+','+order.address.zipcode }</p>
                      <p>Phone: {order.address.phone}</p>
                       </div>
                      <p className=''>Ordered Date : {formatDate(order.date)}</p>
                       </div>
                                              

                        

                        <p>Items: {order.items.length}</p>
                        <p className='text-green-500'>₹ {order.amount}</p>  
                        <div >
                        <select className='border-2 outline-none p-1 border-red-400'
                       onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                          <option value='Food processing'>Food processing</option>
                          <option value='out for delivery'>Out For Delivery</option>
                          <option value='Delivered'>Delivered</option>
                          </select>
                          </div>

                          </div>
                        
                   
                


                )


            })
          }
        </div>
      </div>
    </div>
  )
}

export default Order