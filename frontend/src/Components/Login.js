import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {StoreContext } from '../Context/StoreContext.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)
    const [currState,setCurrState] = useState('SignUp')

    const[data,setData] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleOnchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
       setData(data=>({...data,[name]:value}))
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
        let newURL = url
        if(currState === 'login'){
            newURL += '/api/user/login'
        }
        else
        {
            newURL +='/api/user/register'
        }

        const response = await axios.post(newURL,data)

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)

            const isAdmin = data.email === 'admin@gmail.com' && data.password === '12345678';
            
            // Redirect the user based on admin status
            if (isAdmin) {
                // Redirect admin users to the add page
                window.location.href = '';
            } else {
                // Redirect regular users to the home page
                window.location.href = '/';
            }
            
            toast.success('Login Success') 
            setShowLogin(false)            
        }
        else
        {
            // alert(response.data.message)
            toast(response.data.message)
        }

    }   

  return (
    <div className='absolute w-full h-full z-50 bg-[#00000090]'>
        <div className='flex mt-5 justify-center items-center h-full  '>

           <form onSubmit={handleLogin} className='bg-white w-[320px] xl:w-[23%] h-fit mx-10 rounded-md flex flex-col gap-5 p-5 '>
            <div className='flex justify-between  items-center mx-5'>
            <h1 className='text-2xl font-medium'>{currState}</h1>
            <img src={assets.cross_icon} alt='cancel icon' onClick={()=>setShowLogin(false)} className='cursor-pointer w-4' />
            </div>

            <div className='flex flex-col mx-5 gap-5 '>
                {
                    currState === 'login' ? <></>:<input type='text ' placeholder='Enter your name' name='name' value={data.name} 
                    onChange={handleOnchange} className='outline-none border-2 border-red-400 p-2 rounded-md' required/>
                }
                
                <input type='email ' placeholder='Enter your email' name='email' value={data.email} onChange={handleOnchange}
                 className='outline-none border-2 border-red-400 p-2 rounded-md' required/>
                <input type='password' placeholder='Enter your password' name='password' value={data.password} onChange={handleOnchange}
                  className='outline-none border-2 border-red-400 p-2 rounded-md' required/>
            </div>

            <button type='submit' className='mx-5 bg-[#E97557] p-2 rounded-md text-white '>{currState === 'SignUp' ? 'Create Account':'Login'}</button>
           {
            currState === 'login'?<></>:
            <div className='mx-5 flex items-baseline gap-2'>
            <input type='checkbox' required />
            <p>By continuing I agree to the terms of use & privacy policy</p>

        </div>
           }
           
            {
                currState === 'login' ?
                <p className='mx-5 cursor-pointer'>create a new account ? <span onClick={()=>setCurrState('SignUp')} className='text-red-400'>Click here</span></p>:
                <p  className='mx-5 cursor-pointer'>Already have an account ? <span onClick={()=>setCurrState('login')} className='text-red-400'>Login here</span></p>
            }

           </form>
        </div>
    </div>
  )
}

export default Login