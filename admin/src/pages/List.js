import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
 
  const [list,setList] = useState([])

    const fetchList = async ()=>{
      const response = await axios.get(`${url}/api/food/list`)
      

      console.log(response.data)

      if(response.data.success)
        {
          setList(response.data.data)
        }
      else
      {
        toast.error('Error')
      }

    }

    const handleRemove = async(foodId)=>{
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
      console.log(foodId)
      await fetchList()
      if(response.data.success)
        {
          toast.success(response.data.message)
        }
      else
      {
        toast.error('Error')
      }
      
    }

    useEffect(()=>{
      fetchList()
    },[])

   
  return (
    <div className='w-full mx-1 lg:mx-10 pt-5'>
      <div>
        <h1 className='text-xl font-medium'>All food list</h1>
      </div>
      <div className='border-2 mt-5'>
        <div className='grid p-3 text-center border-b-2 hidden md:grid grid-cols-5'>
          <h1>Images</h1>
          <h1>Name</h1>
          <h1>Category</h1>
          <h1>Price</h1>
          <h1>Action</h1>
        
        </div>
        <div className='flex flex-col gap-3 '>     

        
        {
          list.map((item,index)=>{
            return  <div className='grid p-3 text-center items-center border-b-2 grid-cols-3 md:grid-cols-5 gap-5 md:gap-0'key={index} >
                <img src={`${url}/images/`+item.image} alt='food' className='w-24 mx-2 '/>
                <h1>{item.name}</h1>
                <h1>{item.category}</h1>
                 <h1>₹ {item.price}</h1>
                 <h1 className='cursor-pointer text-xl' onClick={()=>handleRemove(item._id)}>x</h1>
                 
              </div>
                  
          })
          
        }
          
        </div>
      </div>
      

    </div>
  )
}

export default List