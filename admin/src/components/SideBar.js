import React from 'react'
import { assets } from '../assets/assets'
import {NavLink } from 'react-router-dom'


const SideBar = () => {
  return (
    <div className='w-[18%] md:w-[25%] lg:w-[18%] border-r-2 h-screen cursor-pointer'>
        <div className='flex flex-col pl-[20%] gap-10 pt-[20%]'>
            <NavLink to={'/add'} className='flex items-center gap-4 border-2 p-2 border-r-0 sidebar rounded-l-md'>
                <img src={assets.add_icon} alt='add'  />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink to={'/list'} className='flex items-center gap-4 border-2 p-2 border-r-0 sidebar rounded-l-md'>
                <img src={assets.order_icon} alt='add' />
                <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink to={'/order'} className='flex items-center gap-4 border-2 p-2 border-r-0 sidebar rounded-l-md'>
                <img src={assets.order_icon} alt='add' />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar