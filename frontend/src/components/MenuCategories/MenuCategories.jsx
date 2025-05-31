import React, { useContext, useEffect, useState } from 'react'
import './MenuCategories.css'
import { CartContext } from '../../context/CartContext'
import { assets } from '../../assets/assets'

const MenuCategories = ({ category, setCategory }) => {
    const { foodList } = useContext(CartContext)
    const [categories, setCategories] = useState([])

    useEffect(() => {
            if (Array.isArray(foodList) && foodList.length > 0) {
                const uniqueTypes = {}
    
                foodList.forEach(item => {
                    const typeName = item.productType?.name || 'Прочее'
                    if (!uniqueTypes[typeName]) {
                        uniqueTypes[typeName] = {
                            id: item.productType?._id || Math.random().toString(),
                            name: typeName
                        }
                    }
                })
    
                setCategories(Object.values(uniqueTypes))
            }
        }, [foodList])

    return (
        <div className="menuCategories">
            <h1>Категории</h1>
            <div className="menuCategoriesList">
                {Object.keys(categories).length === 0 ? (
                    <p>Нет доступных категорий</p>
                ) : (
                    categories.map((type) => (
                        <div
                            key={type.id}
                            onClick={() => setCategory(prev => prev === type.name ? null : type.name)}
                            className={`exploreMenuListItem ${category === type.name ? "active" : ""}`}
                        >
                            <p>{type.name}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MenuCategories