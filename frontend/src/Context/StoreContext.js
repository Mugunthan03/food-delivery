import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const StoreContext = createContext()

const StoreContextProvider = (props)=>{

    const url = 'https://food-delivery-backend-lm12.onrender.com'
    const [token,setToken] = useState('')

    const [cartItems,setCartItems] = useState([])
    const [food_list,setFoodList] = useState([])
   

    // add to cart to both frontend and database
    const addToCart = async (itemId) => {
        try {
            if (!cartItems[itemId]) {
                setCartItems(prev => ({ ...prev, [itemId]: 1 }));
            }
             else {
                setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            }

            if (token) {
                await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
            }
            toast.success('product added to cart') 
        } 
        catch (err) {
            console.log("Failed to add item to cart", err);
           
        }
    };

    // remove cart from both frontend and database

    const removeFromCart = async (itemId) => {
        try {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));

            if (token) {
                await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
            }
            toast.success('product removed from cart')
        } catch (err) {
            console.log("Failed to remove item from cart", err);
           
        }
    };

    const totalCartAmount = ()=>{
        let totalAmount = 0;
        for (const item in cartItems)
            {
        if(cartItems[item] > 0){
            let cartInfo = food_list.find((product)=>product._id === item)
            totalAmount += cartInfo.price * cartItems[item]
        }
     }
        return totalAmount;
    }

    
    //get foodlist from database

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + '/api/food/list');
            setFoodList(response.data.data);
        } catch (err) {
            console.log("Failed to fetch food list", err);
           
        }
    };

        //after refresh the page the cartdata becomes same

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (err) {
            console.log("Failed to load cart data", err);
            
        }
    };  


    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem('token'))
                {
                    setToken(localStorage.getItem('token'))
                    await loadCartData(localStorage.getItem('token'))
                }
        }
        loadData()
    },[])

    const contextValue = {
        food_list:food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        totalCartAmount,
        url,
        token,
        setToken,

       
    }

    useEffect(()=>{
        console.log(cartItems)

    },[cartItems])

    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
