import React, { useContext, useEffect } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
   
    const {url} = useContext(StoreContext)
    
    const navigate = useNavigate()

    const verifyPayment = async()=>{
        const response = await axios.post(url+'/api/order/verify',{success,orderId})
        if(response.data.success){
            navigate('/myorders')

        }
        else{
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment()

    },[])

  return (
   <div className='pt-20 pb-20 h-full '>
    <div className=' min-h-[60vh] flex justify-center items-center'>
    <div className='border-4 border-gray-300 border-t-red-500 w-[70px] h-[70px] rounded-full animate-spin'>

        </div>  

    </div>
   

   </div>
  )
}

export default Verify