import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div>
      <div className='flex justify-between items-center mx-6 mt-1 xl:mt-3 mb-2'>
        <Link to='https://food-delivery-frontend-98jk.onrender.com'><img src={assets.logo} alt='nav logo' className='w-40  lg:w-44' /></Link>
        <img src={assets.profile_image} alt='profile' className='w-10 lg:w-14 rounded-full' />
      </div>
    </div>
  );  
}

export default Navbar;
