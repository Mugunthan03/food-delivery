import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({url}) => {

  
  const [image,setImage] = useState(false)
  const [data,setData] = useState({
    name:'',
    description:'Food provides essential nutrients for overall health and well-being',
    category:'Salad',
    price:''
  })

  const handleOnChange = (e)=>{
     const name = e.target.name
     const value = e.target.value
     setData((data)=>({...data,[name]:value}))
  }


      const handleSubmit =async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',data.price)
        formData.append('category',data.category)
        formData.append('image',image)  
        
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success)
          {
           toast.success(response.data.message)          
          }
          else
          {            
            toast.error(response.data.message)
          }

          setData({
            name:'',
            description:'Food provides essential nutrients for overall health and well-being',
            category:'Salad',
            price:''
         })
         setImage(false)
      }
        
  
  return (
    <div className='w-[80%] lg:w-1/2 xl:w-1/3 mx-3 my-5'>
        <div>
          <form className=' border-2 p-5 flex flex-col gap-5' onSubmit={handleSubmit} autoComplete='off'>
            <div>
              <h1 className='text-lg'>Upload Image</h1>
              <label htmlFor='image'>
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt='upload' className='mt-2 cursor-pointer w-40' />
              </label>
              <input type='file' hidden required id='image' onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div>
              <p  className='text-lg mt-2'>Product Name</p>
              <input type='text' name='name' placeholder='Product Name' onChange={handleOnChange} value={data.name}
               className='w-full mt-2 outline-none border-2 p-2 rounded-lg' required/>
            </div>
            <div>
              <p>Product Description</p>
              <textarea cols={10} rows={5} name='description' placeholder='Enter Your Description'   onChange={handleOnChange} value={data.description}
              className='w-full mt-2 outline-none border-2 p-2 rounded-lg'></textarea>
            </div>
            <div className='flex gap-5 items-center flex-wrap md:flex-nowrap md:gap-20'>
              <div>
              <h1>Product Category</h1>
              <select className='outline-none border-2 p-2  mt-2' onChange={handleOnChange} name='category' >
                <option value='Salad'>Salad</option>
                <option value='Rolls'>Rolls</option>
                <option value='Deserts'>Deserts</option>
                <option value='Sandwich'>Sandwich</option>
                <option value='Cake'>Cake</option>
                <option value='Pure Veg'>Pure Veg</option>
                <option value='Pasta'>Pasta</option>
                <option value='Noodles'>Noodles</option>
                </select>
                </div>

                <div>
              <p className='text-lg '>Product Price</p>
              <input type='number' name='price' placeholder='₹ 250' className='mt-2 outline-none border-2 px-2' onChange={handleOnChange} 
              value={data.price} required/>
            </div>
            </div>
           
            <button className='flex w-fit px-10 py-2 bg-orange-400 text-white rounded-md' type='submit'>Add</button>
          </form>
        </div>
    </div>
  )
}

export default Add