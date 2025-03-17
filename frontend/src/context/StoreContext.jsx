import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvder = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const clearCart = () => {
            setCartItems([]);
    }

    const clearItemFromCart = (itemId) => { 
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-prev[itemId]}))
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0) {
                let itemInfo = food_list.find((product)=>product._id === item)
                totalAmount += itemInfo.price* cartItems[item];
            }
        }
        return totalAmount;
    }

    const getItemsCount = () => {
        let totalCount = 0;
        for (const item in cartItems) 
        {
            if (cartItems[item]>0) {
                let itemInfo = food_list.find((product)=>product._id === item)
                totalCount += 1
            }
        }
        return totalCount;
    }

    const getDeliveryPrice = () => {
        const totalAmount = getTotalCartAmount(); 
    
        if (typeof totalAmount !== "number" || isNaN(totalAmount)) {
            console.error("Некорректное значение totalAmount:", totalAmount);
            return 300; 
        }
    
        let deliveryPrice = 300;
        let parts = Math.floor(totalAmount / 200); 
    
        deliveryPrice -= 25 * parts; 
    
        return Math.max(deliveryPrice, 0); 
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        getItemsCount,
        getDeliveryPrice,
        clearItemFromCart,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvder