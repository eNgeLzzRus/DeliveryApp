// FoodItem.jsx

import React, { useState, useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import ProductModal from '../ProductModal/ProductModal'
import api from '../../api'
import { CartContext } from '../../context/CartContext'

const FoodItem = ({ id, name, price, description, image, isOrdered, isPopular }) => {
    const { cartItems, addItemToCart, decreaseItemQuantity } = useContext(CartContext)
    const [showModal, setShowModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchProductDetails = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/products/${id}/details`)
            setProductDetails(response.data)
            setShowModal(true)
        } catch (err) {
            console.error('Ошибка загрузки деталей товара:', err)
            alert('Не удалось загрузить информацию о товаре')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="foodItem" onClick={fetchProductDetails}>
                <div className="foodItemImgContainer">
                    <img 
                        className="foodItemImg" 
                        src={`http://localhost:3001/images/products/${image}`} 
                        alt={name} 
                        onError={(e) => e.target.src = assets.placeholder_food}
                    />
                    {!cartItems[id] ? (
                        <img 
                            className="add" 
                            onClick={(e) => {
                                e.stopPropagation()
                                addItemToCart(id)
                            }} 
                            src={assets.add_icon_white} 
                            alt="Добавить в корзину"
                        />
                    ) : (
                        <div className="foodItemCounter">
                            <img 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    decreaseItemQuantity(id)
                                }} 
                                src={assets.remove_icon_red} 
                                alt="Уменьшить"
                            />
                            <p>{cartItems[id]}</p>
                            <img 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    addItemToCart(id)
                                }} 
                                src={assets.add_icon_green} 
                                alt="Увеличить"
                            />
                        </div>
                    )}
                </div>

                <div className="foodItemInfo">
                    <div className="foodItemNameRating">
                        <p>{name}</p>
                        {isOrdered && <span className="orderedBadge">Заказывали</span>}
                        {!isOrdered && isPopular && <span className="popularBadge">Популярное</span>}
                    </div>
                    <p className="foodItemDesc">{description || 'Описание отсутствует'}</p>
                    <p className="foodItemPrice">{price} ₽</p>
                </div>
            </div>

            {/* Модальное окно */}
            {showModal && (
                <ProductModal
                    product={productDetails}
                    onClose={() => setShowModal(false)}
                    loading={loading}
                />
            )}
        </>
    )
}

export default FoodItem