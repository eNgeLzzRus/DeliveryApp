import React, { useEffect, useContext } from 'react';
import './ProductModal.css';
import { CartContext } from '../../context/CartContext';
import { assets } from '../../assets/assets';

const ProductModal = ({ product, onClose }) => {
    const { addItemToCart, decreaseItemQuantity, cartItems } = useContext(CartContext);
    const isInCart = cartItems[product._id];

    // Закрытие по Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-body">
                    <img
                        src={`http://localhost:3001/images/products/${product.image}`}
                        alt={product.name}
                        className="modal-image"
                    />

                    <div className="modal-info">
                        <h2>{product.name}</h2>
                        <p className="modal-description">{product.description}</p>

                        <div className="modal-details">
                            <span>Вес: {product.weight || 'Не указано'}</span>
                            <span>Время приготовления: {product.cookingTime || 'Не указано'}</span>
                            <span>Тип: {product.type || 'Не указано'}</span>
                            <span className="price">{product.price} ₽</span>
                        </div>

                        <h3>Ингредиенты:</h3>
                        <ul className="ingredient-list">
                            {product.ingredients.length > 0 ? (
                                product.ingredients.map((ingredient) => (
                                    <li key={ingredient.id}>
                                        {ingredient.name} — {ingredient.amount}
                                    </li>
                                ))
                            ) : (
                                <li>Ингредиенты не указаны</li>
                            )}
                        </ul>

                        {/* Контейнер для кнопки или счётчика */}
                        <div className="action-container">
                            {!isInCart ? (
                                <button className="add-to-cart-button" onClick={() => addItemToCart(product._id)}>
                                    <img src={assets.add_icon_white} alt="Добавить" />
                                    Добавить в корзину
                                </button>
                            ) : (
                                <div className="foodItemCounter modal-counter">
                                    <img
                                        onClick={() => decreaseItemQuantity(product._id)}
                                        src={assets.remove_icon_red}
                                        alt="Уменьшить"
                                    />
                                    <p>{isInCart}</p>
                                    <img
                                        onClick={() => addItemToCart(product._id)}
                                        src={assets.add_icon_green}
                                        alt="Увеличить"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;