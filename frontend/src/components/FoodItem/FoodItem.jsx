// FoodItem.jsx

import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { CartContext } from '../../context/CartContext'

const FoodItem = ({ id, name, price, description, image, isOrdered, isPopular }) => {
    const { cartItems, addItemToCart, decreaseItemQuantity } = useContext(CartContext)

    return (
        <div className="foodItem">
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
                        onClick={() => addItemToCart(id)} 
                        src={assets.add_icon_white} 
                        alt="Добавить в корзину"
                    />
                ) : (
                    <div className="foodItemCounter">
                        <img 
                            onClick={() => decreaseItemQuantity(id)} 
                            src={assets.remove_icon_red} 
                            alt="Уменьшить"
                        />
                        <p>{cartItems[id]}</p>
                        <img 
                            onClick={() => addItemToCart(id)} 
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
    )
}

export default FoodItem