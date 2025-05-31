import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import api from '../api';
import { AccountContext } from './AccountContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [recommendedList, setRecommendedList] = useState([]);
    const { userId, isAuthenticated } = useContext(AccountContext);

    // Загрузка продуктов
    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await api.get('/products');
                setFoodList(response.data);
            } catch (error) {
                console.error('Ошибка загрузки меню:', error);
            }
        };
        fetchFoodList();
    }, []);

    // Загрузка рекомендаций
    useEffect(() => {
        const fetchRecommended = async () => {
            if (!isAuthenticated || !userId) {
                setRecommendedList([]);
                return;
            }

            try {
                const response = await api.get(`/products/recommended/${userId}`);
                setRecommendedList(response.data || []);
            } catch (error) {
                console.error('Ошибка загрузки рекомендаций:', error);
                setRecommendedList([]);
            }
        };

        fetchRecommended();
    }, [userId, isAuthenticated]);

    const addItemToCart = (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const decreaseItemQuantity = (itemId) => {
        setCartItems(prev => {
            if ((prev[itemId] || 0) <= 1) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return {
                ...prev,
                [itemId]: prev[itemId] - 1
            };
        });
    };

    const clearItemFromCart = (itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            delete newCart[itemId];
            return newCart;
        });
    };

    const clearCart = () => {
        setCartItems({});
    };

    const getTotalCartAmount = useMemo(() => {
        return () => {
            let total = 0;
            for (const itemId in cartItems) {
                const item = foodList.find(p => p._id === Number(itemId));
                if (item && cartItems[itemId] > 0) {
                    total += item.price * cartItems[itemId];
                }
            }
            return total;
        };
    }, [cartItems, foodList]);

    const getDeliveryPrice = useMemo(() => {
        return () => {
            const total = getTotalCartAmount();
            let deliveryPrice = 300;
            let parts = Math.floor(total / 200);
            deliveryPrice -= 25 * parts;
            return Math.max(deliveryPrice, 0);
        };
    }, [getTotalCartAmount]);

    const checkout = async (clientId) => {
        try {
            const products = Object.entries(cartItems).map(([productId, amount]) => ({
                productId: Number(productId),
                amount
            }));
            await api.post('/orders', {
                clientId,
                products,
                totalAmount: getTotalCartAmount(),
                deliveryPrice: getDeliveryPrice()
            });
            clearCart();
            return { success: true };
        } catch (error) {
            console.error('Ошибка оформления заказа:', error);
            return { success: false, error: error.response?.data?.error || 'Ошибка сервера' };
        }
    };

    const value = useMemo(() => ({
        foodList,
        cartItems,
        recommendedList,
        addItemToCart,
        clearItemFromCart,
        decreaseItemQuantity,
        clearCart,
        checkout,
        getTotalCartAmount,
        getDeliveryPrice
    }), [
        foodList,
        cartItems,
        recommendedList,
        getTotalCartAmount,
        getDeliveryPrice
    ]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};