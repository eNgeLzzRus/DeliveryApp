import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { CartContext } from '../../context/CartContext'

const FoodDisplay = ({ category }) => {
    const { recommendedList } = useContext(CartContext)

    return (
        <div className='foodDisplay'>
            <h2>Рекомендуем вам</h2>
            <div className="foodDisplayList">
                {Array.isArray(recommendedList) && recommendedList.length > 0 ? (
                    recommendedList.map((item) => {
                        return <FoodItem 
                                key={item._id || index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                    })
                ) : (
                    <p>Нет рекомендованных товаров</p>
                )}
            </div>
        </div>
    )
}

export default FoodDisplay