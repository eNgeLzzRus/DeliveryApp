import React, { useContext, useEffect, useState } from 'react';
import './MenuCategories.css';
import { CartContext } from '../../context/CartContext';

const MenuCategories = ({ category, setCategory }) => {
    const { foodList } = useContext(CartContext);
    const [categories, setCategories] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (Array.isArray(foodList) && foodList.length > 0) {
            const uniqueTypes = {};
            foodList.forEach(item => {
                const typeName = item.productType?.name || 'Прочее';
                if (!uniqueTypes[typeName]) {
                    uniqueTypes[typeName] = {
                        id: item.productType?._id || Math.random().toString(),
                        name: typeName
                    };
                }
            });
            setCategories(Object.values(uniqueTypes));
            
            // Устанавливаем категорию "Все продукты" по умолчанию
            // только если category еще не установлена
            if (category === undefined) {
                setCategory(null);
            }
        }
    }, [foodList, category, setCategory]);

    return (
        <div className="light-neon-menu">
            <div className="light-neon-menu-header">
                <h2 className="light-neon-title">КАТЕГОРИИ</h2>
                <div className="light-neon-underline"></div>
            </div>
            
            <div className="light-neon-list">
                {categories.length === 0 ? (
                    <div className="light-neon-loading">
                        <div className="light-pulse"></div>
                        <span>Загрузка категорий...</span>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => setCategory(null)}
                            className={`light-neon-item ${!category ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredItem('all')}
                            onMouseLeave={() => setHoveredItem(null)}
                            data-hover={hoveredItem === 'all'}
                        >
                            <span>ВСЕ ПРОДУКТЫ</span>
                            <div className="light-neon-highlight"></div>
                        </button>
                        
                        {categories.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setCategory(type.name)}
                                className={`light-neon-item ${category === type.name ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredItem(type.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                data-hover={hoveredItem === type.id}
                            >
                                <span>{type.name.toUpperCase()}</span>
                                <div className="light-neon-highlight"></div>
                            </button>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuCategories;