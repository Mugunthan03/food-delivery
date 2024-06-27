import React from 'react'
import { assets } from '../assets/assets'

const MobileApp = () => {
  return (
    <div>
        <div className='pt-20 pb-10 text-center ' id='mobileapp'>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-medium'>For better experience download <br />Take Away app</h1>
            <div className='flex justify-center gap-10 mt-10 '>
                <img src={assets.play_store} alt="playstore" className='w-28 md:w-48 hover:scale-105 duration-300 ease-in' />
                <img src={assets.app_store} alt="playstore"   className='w-28 md:w-48 hover:scale-105 duration-300 ease-in' />
            </div>
        </div>
    </div>
  )
}

export default MobileApp