// FoodItem.jsx (без изменений в логике, только обновил className)
import React, { useState, useContext } from 'react'
import './FoodItem.css' // Изменил имя файла стилей
import { assets } from '../../assets/assets'
import { CartContext } from '../../context/CartContext'
import ProductModal from '../ProductModal/ProductModal'
import api from '../../api'

const FoodItem = ({ id, name, price, description, image, isOrdered, isPopular }) => {
  const { cartItems, addItemToCart, decreaseItemQuantity } = useContext(CartContext)
  const [showModal, setShowModal] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchProductDetails = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/products/${id}/details`)
      setProductDetails(response.data)
      setShowModal(true)
    } catch (err) {
      console.error('Ошибка загрузки деталей товара:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div 
        className={`light-food-card ${isHovered ? 'light-hover' : ''}`}
        onClick={fetchProductDetails}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="light-food-badge-container">
          {isPopular && !isOrdered && (
            <div className="light-badge light-popular">
              <span className="light-badge-text">ПОПУЛЯРНОЕ</span>
            </div>
          )}
          {isOrdered && (
            <div className="light-badge light-ordered">
              <span className="light-badge-text">ЗАКАЗЫВАЛИ</span>
            </div>
          )}
        </div>

        <div className="light-food-img-wrapper">
          <img 
            src={`http://localhost:3001/images/products/${image}`} 
            alt={name}
            className="light-food-img"
            onError={(e) => e.target.src = assets.placeholder_food}
          />
          <div className="light-img-overlay"></div>
        </div>

        <div className="light-food-content">
          <div className="light-food-header">
            <h3 className="light-food-title">{name}</h3>
            <p className="light-food-desc">{description || 'No description available'}</p>
          </div>

          <div className="light-food-footer">
            <p className="light-food-price">{price} ₽</p>
            
            {!cartItems[id] ? (
              <button 
                className="light-add-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  addItemToCart(id)
                }}
              >
                <span className="light-btn-text">ADD</span>
                <span className="light-btn-icon">+</span>
              </button>
            ) : (
              <div className="light-counter">
                <button 
                  className="light-counter-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    decreaseItemQuantity(id)
                  }}
                >
                  -
                </button>
                <span className="light-counter-value">{cartItems[id]}</span>
                <button 
                  className="light-counter-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    addItemToCart(id)
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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