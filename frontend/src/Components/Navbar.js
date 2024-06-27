import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext'
import { toast } from 'react-toastify'


const Navbar = ({setShowLogin}) => {
    const [activeMenu, setActiveMenu] = useState('Home')

    const {totalCartAmount,token,setToken} = useContext(StoreContext)      

    const navigate = useNavigate()

    const logout = ()=>{
      localStorage.removeItem('token')
      setToken('')
      toast.success('Successfully LoggedOut')
      navigate('/')

    }

  return (
    <div className='flex justify-between items-center mt-4 lg:mt-1'>
        <div>
        <Link to={'/'}><img src={assets.logo} alt='logo' className='w-28 md:w-28 lg:w-52' /></Link>
        </div>
        <div className=' gap-5 items-center cursor-pointer transition-all hidden md:flex lg:text-lg'>
                <Link to={'/'} className={` ${activeMenu === 'Home' ? 'border-b-2 border-[#49557e]' : ''}`} onClick={() => setActiveMenu('Home')}>Home</Link>
                <a href='#menu' className={` ${activeMenu === 'Menu' ? 'border-b-2 border-[#49557e]' : ''}`} onClick={() => setActiveMenu('Menu')}>Menu</a>
                {/* <a href='#mobileapp' className={` ${activeMenu === 'Mobile-App' ? 'border-b-2 border-[#49557e]' : ''}`} onClick={() => setActiveMenu('Mobile-App')}>Mobile-App</a> */}
                <a href='#footer' className={` ${activeMenu === 'Contact Us' ? 'border-b-2 border-[#49557e]' : ''}`} onClick={() => setActiveMenu('Contact Us')}>Contact Us</a>
            </div>
        <div className='flex gap-3 md:gap-5 items-center cursor-pointer'>
             <img src={assets.search_icon} alt='search-icon' className='w-5 md:w-5' />  

             <div>                
             <Link to={'/cart'}><img src={assets.basket_icon} alt='bag-icon' className='w-5 md:w-5 relative' /></Link>
             <div className={`${totalCartAmount()=== 0 ?'':'bg-red-500 min-w-2 min-h-2  rounded-xl top-3  absolute'}`}></div>
                
                </div> 
                {
                  !token ? <button className='border-2 rounded-xl px-2 md:px-3 text-lg hover:bg-red-200 transition-all border-red-300'
                  onClick={()=>setShowLogin(true)}>Sign IN</button> :
                  <div className='flex gap-3 md:gap-6 items-center'>

                    <div className='relative group'>
                      <img src={assets.bag_icon} alt='bag' className='h-6 md:h-6 hover:scale-105 ' onClick={()=>navigate('/myorders')} />
                      <p className='absolute -right-4  opacity-0 group-hover:opacity-100  bg-white border-2  z-50 px-3 py-1 text-lg 
                      rounded-md mt-5 '>Orders</p>
                      </div>
                    <div className='relative group'>
                    <img src={assets.profile_icon} alt='profile' className='w-5 md:w-5 hover:scale-105' />
                      <p className='absolute -right-4  opacity-0 group-hover:opacity-100  bg-white border-2  z-50 px-3 py-1 text-lg 
                      rounded-md mt-5 '>User</p>
                      </div>
                    <div className='relative group'>
                    <img src={assets.logout_icon} alt='logout' className='hover:scale-95 w-6 md:w-7' onClick={logout} />
                      <p className='absolute -right-4  opacity-0 group-hover:opacity-100 border-2 bg-white border-2  z-50 px-3 py-1 text-lg 
                      rounded-md mt-5 '>Logout</p>
                      </div>                   
                     
                  </div>
                }
            
        </div>
    </div>
  )
}

export default Navbar