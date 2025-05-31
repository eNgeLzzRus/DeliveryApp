// context/CartContext.jsx

import React, { createContext, useState, useEffect, useMemo, useContext } from 'react'
import api from '../api'
import { AccountContext } from './AccountContext'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({})
    const [foodList, setFoodList] = useState([])
    const [recommendedList, setRecommendedList] = useState([])
    const { userId, setUserId } = useContext(AccountContext)

    
    // Загрузка продуктов
    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await api.get('/products')
                console.log('Полученные товары:', response.data)
                setFoodList(response.data)
            } catch (error) {
                console.error('Ошибка загрузки меню:', error.response?.data || error.message)
            }
        }

        fetchFoodList()
    }, [])

    useEffect(() => {
        const fetchRecommendedList = async () => {
            console.log("userId:", userId);
            try {
                
                // Убедитесь, что userId существует и корректен
                if (!userId) {
                    console.log('UserID не определен');
                    setRecommendedList([]);
                    return;
                }
                
                console.log('Запрашиваем рекомендации для userID:', userId);
                
                const response = await api.get(`/products/recommended/${userId}`);
                
                // Добавьте логирование полного ответа
                console.log('Полный ответ сервера:', response); 
                
                setRecommendedList(response.data);
            } catch (error) {
                console.error('❌ Ошибка при загрузке рекомендаций:', error.response?.data || error.message);
                setRecommendedList([]);
            }
        }

        fetchRecommendedList();
    }, [userId]);

    // Функции корзины
    const addItemToCart = (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }))
    }

    const decreaseItemQuantity = (itemId) => {
        setCartItems(prev => {
            if (prev[itemId] <= 1) {
                const newCart = { ...prev }
                delete newCart[itemId]
                return newCart
            }
            return {
                ...prev,
                [itemId]: prev[itemId] - 1
            }
        })
    }

    const clearItemFromCart = (itemId) => {
        const newCart = { ...cartItems }
        delete newCart[itemId]
        setCartItems(newCart)
    }

    const clearCart = () => {
        setCartItems({})
    }

    const getTotalCartAmount = useMemo(() => {
        return () => {
            let totalAmount = 0
            for (const itemId in cartItems) {
                if (cartItems[itemId] > 0) {
                    const itemInfo = foodList.find(product => product._id === Number(itemId))
                    if (itemInfo && cartItems[itemId] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemId]
                    }
                }
            }
            return totalAmount
        }
    }, [cartItems, foodList])

    const getDeliveryPrice = useMemo(() => {
        return () => {
            const totalAmount = getTotalCartAmount()
            let deliveryPrice = 300
            let parts = Math.floor(totalAmount / 200)
            deliveryPrice -= 25 * parts
            return Math.max(deliveryPrice, 0)
        }
    }, [getTotalCartAmount])

    const checkout = async (clientId) => {
        try {
            const products = Object.entries(cartItems).map(([productId, amount]) => ({
                productId: Number(productId),
                amount
            }))
            await api.post('/orders', {
                clientId,
                products,
                totalAmount: getTotalCartAmount(),
                deliveryPrice: getDeliveryPrice()
            })
            clearCart()
            return { success: true }
        } catch (error) {
            console.error('Ошибка оформления заказа:', error)
            return { success: false, error: error.response?.data?.error || 'Ошибка сервера' }
        }
    }

    const value = {
        foodList,
        cartItems,
        addItemToCart,
        clearItemFromCart,
        decreaseItemQuantity,
        clearCart,
        checkout,
        getTotalCartAmount,
        getDeliveryPrice,
        recommendedList,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}