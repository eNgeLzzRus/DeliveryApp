import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import api from '../api'
import { AccountContext } from './AccountContext'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({})
    const [foodList, setFoodList] = useState([])
    const [recommendedList, setRecommendedList] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { userId } = useContext(AccountContext)
    const [appliedPromo, setAppliedPromo] = useState(null)

    const getTotalCartAmount = useCallback(() => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const item = foodList.find(product => String(product._id) === String(itemId))
            return item ? total + (item.price * quantity) : total
        }, 0)
    }, [cartItems, foodList])

    const getDeliveryPrice = useCallback(() => {
        const totalAmount = getTotalCartAmount()
        const discountParts = Math.floor(totalAmount / 200)
        return Math.max(300 - (25 * discountParts), 0)
    }, [getTotalCartAmount])

    const applyPromo = useCallback(async (promoCode) => {
        try {
            const response = await api.get(`/promo/check?code=${promoCode}&totalAmount=${getTotalCartAmount()}`)
            setAppliedPromo(response.data)
            return response.data
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Неверный промокод'
            setAppliedPromo(null)
            return { success: false, error: errorMsg }
        }
    }, [getTotalCartAmount])

    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = localStorage.getItem('cartItems')
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart)
                    setCartItems(parsedCart)
                    setCartCount(Object.values(parsedCart).reduce((sum, q) => sum + q, 0))
                }
            } catch (error) {
                console.error('Cart loading error:', error)
                localStorage.removeItem('cartItems')
            } finally {
                setIsLoading(false)
            }
        }

        loadCart()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            setCartCount(Object.values(cartItems).reduce((sum, q) => sum + q, 0))
        }
    }, [cartItems, isLoading])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [foodResponse, recommendedResponse] = await Promise.all([
                    api.get('/products'),
                    userId ? api.get(`/products/recommended/${userId}`) : Promise.resolve({ data: [] })
                ])
                setFoodList(foodResponse.data)
                setRecommendedList(recommendedResponse.data)
            } catch (error) {
                console.error('Error loading products:', error)
            }
        }

        fetchProducts()
    }, [userId])

    const updateCartItem = useCallback((itemId, operation) => {
        setCartItems(prev => {
            const newCart = { ...prev }
            const currentQty = newCart[itemId] || 0

            switch (operation) {
                case 'increment':
                    newCart[itemId] = currentQty + 1
                    break
                case 'decrement':
                    if (currentQty <= 1) {
                        delete newCart[itemId]
                    } else {
                        newCart[itemId] = currentQty - 1
                    }
                    break
                case 'remove':
                    delete newCart[itemId]
                    break
                default:
                    return prev
            }

            return newCart
        })
    }, [])

    const clearCart = useCallback(() => {
        setCartItems({})
        setAppliedPromo(null)
    }, [])

    const checkout = useCallback(async () => {
        if (!userId) {
            return { success: false, error: 'Необходимо авторизоваться' }
        }

        try {
            const orderData = {
                clientId: userId,
                products: Object.entries(cartItems).map(([productId, amount]) => ({
                    productId: productId,
                    amount: Number(amount)
                })),
                promoCodeId: appliedPromo?.promoId || null
            }

            const response = await api.post('/orders', orderData)
            clearCart()
            return { success: true, orderId: response.data.orderId }
        } catch (error) {
            console.error('Checkout error:', error)
            return {
                success: false,
                error: error.response?.data?.error || 'Ошибка при оформлении заказа'
            }
        }
    }, [cartItems, userId, clearCart, appliedPromo])

    const value = {
        foodList,
        recommendedList,
        cartItems,
        cartCount,
        isLoading,
        addItemToCart: (itemId) => updateCartItem(itemId, 'increment'),
        decreaseItemQuantity: (itemId) => updateCartItem(itemId, 'decrement'),
        clearItemFromCart: (itemId) => updateCartItem(itemId, 'remove'),
        clearCart,
        checkout,
        getTotalCartAmount,
        getDeliveryPrice,
        applyPromo,
        appliedPromo,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}