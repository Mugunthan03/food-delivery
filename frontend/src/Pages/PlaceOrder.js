import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const PlaceOrder = () => {
  const { totalCartAmount, token, food_list, url, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data,[name]:value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
   
    let orderData = {
      address:data,
      items:orderItems,
      amount:totalCartAmount()+30,
    }

    let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else
    {
      alert('Errors')
    }
      
  };

const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/')
      alert('Login to Buy the products ')
    }
    else if(totalCartAmount() === 0)
      {
        alert('Add Products to checkout')
        navigate('/')
      }

  },[token])

  

  return (
    <div className="mt-16 pb-10">

      <div className="">

        <form className="flex gap-10 flex-wrap md:flex-nowrap " onSubmit={placeOrder}>
          
          <div className="w-full md:w-1/2">
          <h1 className="text-xl font-medium mb-10">Delivery Information</h1>
          <div className=" flex flex-col gap-2">
            <div className="flex gap-2 ">
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                placeholder="First Name"
                className="border-2 w-1/2 p-1 outline-orange-400 " required
              />

              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                placeholder="Last Name"
                className="border-2  w-1/2 p-1 outline-orange-400" required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Email Address"
                className="border-2 w-full p-1 outline-orange-400" required
              />
            </div>
            <div>
              <input
                type="text"
                name="street"
                onChange={handleChange}
                value={data.street}
                placeholder="Street"
                className="border-2 w-full p-1 outline-orange-400" required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={data.city}
                placeholder="City"
                className="border-2  w-1/2 p-1 outline-orange-400" required
              />

              <input
                type="text"
                name="state"
                onChange={handleChange}
                value={data.state}
                placeholder="State"
                className="border-2  w-1/2 p-1 outline-orange-400" required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                name="zipcode"
                onChange={handleChange}
                value={data.zipcode}
                placeholder="Zip code"
                className="border-2  w-1/2 p-1 outline-orange-400" required
              />

              <input
                type="text"
                name="country"
                onChange={handleChange}
                value={data.country}
                placeholder="Country"
                className="border-2  w-1/2 p-1 outline-orange-400" required
              />
            </div>
            <div>
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                value={data.phone}
                placeholder="phone "
                className="border-2 w-full p-1 outline-orange-400" required
              />
            </div>

          </div>

          </div>

         
          <div className="w-full md:w-1/2">
          <div className="mt-5 w-full">
            <h1 className="text-2xl md:text-xl font-bold">Cart Totals</h1>
            <div className="flex justify-between text-gray-400 mt-5">
              <h1>SubTotal</h1>
              <p>₹{totalCartAmount()}</p>
            </div>
            <div className="flex justify-between text-gray-400 mt-5">
              <h1>Delivery Fee</h1>
              <p>₹{totalCartAmount() === 0 ? "0" : "30"}</p>
            </div>
            <div className="flex justify-between fon-bold text-lg mt-5">
              <h1>Total</h1>
              <p>₹{totalCartAmount() === 0 ? "0" : totalCartAmount() + 30}</p>
            </div>
            <button
              className="mt-5 bg-[#E96F56] p-2 text-white rounded-md "
              type="submit"
            >
              Proceed to Checkout
            </button>
          </div>

          </div>
         
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
