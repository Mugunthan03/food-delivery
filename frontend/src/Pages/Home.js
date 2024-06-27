import React, { useState } from 'react'
import Header from '../Components/Header.js'
import ExploreMenu from '../Components/ExploreMenu.js'
import FoodDisplay from '../Components/FoodDisplay.js'
import MobileApp from '../Components/MobileApp.js'

const Home = () => {
  const[category,setCategory] = useState('All')
  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} setCategory={setCategory} />
        <MobileApp />
    </div>
  )
}

export default Home


