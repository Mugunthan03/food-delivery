import React, { useState } from 'react'
import './index.css'
import Navbar from './Components/Navbar'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home'
import Cart from './Pages/Cart' 
import PlaceOrder from './Pages/PlaceOrder' 
import Footer from './Components/Footer'
import Login from './Components/Login'
import Verify from './Pages/Verify'
import MyOrder from './Pages/MyOrder'


const App = () => {
  const[showLogin,setShowLogin] = useState(false)
  return (
    <> {
      showLogin ?<Login setShowLogin={setShowLogin}/>:<></>
    }
    <div className='w-[90%] md:w-[82%]  mx-auto'>    
    <ToastContainer />
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'/cart'} element={<Cart />}></Route>
        <Route path={'/order'} element={<PlaceOrder />}></Route>
        <Route path={'/verify'} element={<Verify />}></Route>  
        <Route path={'/myorders'} element={<MyOrder />}></Route>      
      </Routes>
    
    </div>
      <div className=''>
        <Footer />
      </div>
    </>
  )
}

export default App