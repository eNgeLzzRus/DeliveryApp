// ExploreMenu.jsx

import React, { useContext, useEffect, useState } from 'react'
import './ExploreMenu.css'
import { assets } from '../../assets/assets'
import { CartContext } from '../../context/CartContext'

const ExploreMenu = ({ category, setCategory }) => {
    const { foodList } = useContext(CartContext)
    const [productTypes, setProductTypes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (Array.isArray(foodList) && foodList.length > 0) {
            const uniqueTypes = {}

            foodList.forEach(item => {
                const typeName = item.productType?.name || 'Прочее'
                if (!uniqueTypes[typeName]) {
                    uniqueTypes[typeName] = {
                        id: item.productType?._id || Math.random().toString(),
                        name: typeName,
                        image: item.productType?.image || getDefaultImage(typeName)
                    }
                }
            })

            setProductTypes(Object.values(uniqueTypes))
            setLoading(false)
        }
    }, [foodList])

    const getDefaultImage = (categoryName) => {
        switch(categoryName.toLowerCase()) {
            case 'пицца': return '/images/categories/pizza_category.jpg'
            case 'бургер': return '/images/categories/burger_category.jpg'
            case 'напитки': return '/images/categories/drink_category.jpg'
            case 'шаурма': return '/images/categories/dinner_category.jpg'
            case 'роллы': return '/images/categories/sushi_category.jpg'
            case 'прочее': return '/images/categories/another_category.jpg'
            default: return assets.menu_placeholder
        }
    }

    if (loading) {
        return <div className="exploreMenu loading">Загрузка...</div>
    }

    return (
        <div className="exploreMenu" id="exploreMenu">
            <h1>Изучите наше меню</h1>
            <p className="exploreMenuText">Выбирайте из разнообразия наших блюд</p>
            <hr />
        </div>
    )
}

export default ExploreMenu