import React, { useContext } from 'react'
import './FoodMenu.css'
import FoodItem from '../FoodItem/FoodItem'
import { CartContext } from '../../context/CartContext'

const FoodMenu = ({ category }) => {
    const { foodList, recommendedList } = useContext(CartContext)

    // Создаем Map для быстрого поиска isOrdered у товаров
    const orderedMap = new Map(
        recommendedList
            .filter(item => item.isOrdered)
            .map(item => [item._id, true])
    )

    return (
        <div className='foodMenu' id='foodMenu'>
            <h2>Меню</h2>
            <div className="foodMenuList">
                {foodList.map((item, index) => {
                    // Фильтр по категории
                    if (!category || category === "All" || item.productType?.name === category) {
                        // Определяем флаги
                        const isOrdered = orderedMap.has(item._id)
                        const isPopular = index < 10

                        return (
                            <FoodItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                isOrdered={isOrdered}
                                isPopular={isPopular}
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