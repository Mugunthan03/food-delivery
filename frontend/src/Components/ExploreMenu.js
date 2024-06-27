import React from 'react'
import {menu_list} from '../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {

    const handleClick = (selectedCategory)=>{
        setCategory(prev=>prev === selectedCategory ?"All" : selectedCategory)
    }

  return (
    <div className='mt-5 lg:mt-10' id='menu'>
        <div>
            <h1 className='font-medium text-lg md:text-2xl xl:text-3xl '>Explore Menu</h1>
            <p className='w-full  lg:max-w-[80%] text-sm lg:text-base xl:text-lg pt-5 pb-5 hidden md:block'>
                Choose from a diverse menu featuring a delectable array of dishes. 
                our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div className='flex justify-between items-center gap-8 overflow-x-scroll mx-0 md:mx-5 text-center mt-5 scrollbar-hidden '>
                {
                    menu_list.map((item,index)=>{
                        return(
                            <div key={index} className='' onClick={()=>handleClick(item.menu_name)}> 

                                <img src={item.menu_image} alt='category' className={ `w-[50vw] min-w-16 rounded-full 
                                cursor-pointer transition-transform duration-300 hover:scale-95 
                                ease-in ${category === item.menu_name ?'border-[#EC7058] border-4 p-1':''} `} />
                                <h1 className='text-base text-[#747474] cursor-pointer mt-3'>{item.menu_name}</h1>
                             </div>
                        )                        
                    })
                }

            </div>

        </div>
        <hr className='border-none bg-[#e2e2e2] m-3 h-1' />
    </div>
  )
}

export default ExploreMenu