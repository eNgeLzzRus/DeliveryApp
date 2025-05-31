// src/pages/MenuPage/FoodMenu.jsx
import React, { useContext } from 'react'
import './FoodMenu.css'
import FoodItem from '../FoodItem/FoodItem'
import { CartContext } from '../../context/CartContext'

const FoodMenu = ({ category }) => {
    const { foodList } = useContext(CartContext)

    return (
        <div className='foodMenu' id='foodMenu'>
            <h2>Меню</h2>
            <div className="foodMenuList">
                {foodList.map((item, index) => {
                    if (!category || category === "All" || item.productType?.name === category) {
                        return (
                            <FoodItem 
                                key={item._id || index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default FoodMenu