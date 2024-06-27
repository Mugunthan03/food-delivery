import React, { useEffect } from 'react';
import './index.css'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'

const App = () => {
  const url ='https://food-backend-joee.onrender.com'
  const navigate = useNavigate();

  useEffect(() => {
       navigate('/add');
  }, [])

  return (
   <div>
    <ToastContainer />
    <Navbar />
    <hr className='border-none bg-[#e2e2e2] m-1 h-1 ' />
    <div className='flex gap-3'>
        <SideBar />
        <Routes>         

          <Route path={'/add'} element={<Add url={url} />}></Route>
          <Route path={'/list'} element={<List url={url}/>}></Route>
          <Route path={'/order'} element={<Order url={url}/>}></Route>
        </Routes>
    </div>
   
   </div>
  )
}

export default App