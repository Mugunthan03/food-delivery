import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-[#323232] mt-5 ' id="footer">
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 mx-9 md:mx-20 lg:mx-36 pt-10 pb-10 '>
        <div className='w-[90%] flex flex-col items-start gap-5'>
            <img src={assets.logo} alt='logo' className='w-24 xl:w-32' />
            <p className='text-gray-400 text-sm xl:text-lg'>Lorem ipsum dolor sit amet 
            consectetur adipisicing elit. Repellendus tenetur aspernatur, sit iste nesciunt doloribus voluptatibus 
            veritatis officiis quod inventore, asperiores sed ex voluptatem ab.</p>
            <div className='flex items-center gap-10'>
            <img src={assets.facebook_icon} alt='facebook' className='w-9' />
            <img src={assets.twitter_icon} alt='twitter'  className='w-9' />
            <img src={assets.linkedin_icon} alt='linkedin'  className='w-9' />

            </div>
          
        </div>

        <div className='flex flex-col items-start gap-5'>
            <h1 className='text-white text-lg md:text-2xl'>Company</h1>
            <div  className='text-gray-400 text-sm xl:text-lg '>
                <h1>Home</h1>
                <h1>About Us</h1>
                <h1>Delivery</h1>
                <h1>Privacy policy</h1>
                </div>

        </div>
        <div className='flex flex-col items-start gap-3'>
            <h1  className='text-white  text-lg md:text-2xl'>Get In Touch</h1>
            <p  className='text-gray-400 text-sm xl:text-lg'>9876541230</p>
            <p  className='text-gray-400 text-sm xl:text-lg'>contacttomato@gmail.com</p>

        </div>
       </div>
       
       <hr className='border-none bg-gray-300 m-1 h-1 w-[85%] mx-auto' />
       <div className='pb-10 pt-5'>
        <h1 className='text-center text-gray-400 text-sm xl:text-lg '>copyrights 2024 &copy; tomato.com. All rights reserved</h1>
       </div>
    </div>
  )
}

export default Footer