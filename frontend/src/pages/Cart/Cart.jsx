import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Cart.css';
import { assets } from '../../assets/assets';

const Cart = () => {
  const {
    cartItems,
    foodList,
    addItemToCart,
    clearItemFromCart,
    decreaseItemQuantity,
    clearCart,
    checkout,
    getTotalCartAmount,
    getDeliveryPrice,
    cartCount
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    const clientId = 1; // Замените на реальный ID пользователя
    const result = await checkout(clientId);
    if (result.success) {
      navigate('/order-success');
    } else {
      alert(`Ошибка: ${result.error}`);
    }
  };

  return (
    <div className='cart'>
      {cartCount === 0 ? (
        <div className='cleanCart'>
          <h1>Корзина пуста</h1>
          <button onClick={() => navigate('/menu')}>Перейти к покупкам</button>
        </div>
      ) : (
        <div>
          <div className='cartRemoveItems'>
            <button onClick={clearCart}>Очистить корзину</button>
          </div>
          
          <div className="cartItems">
            <div className="cartItemsTitle">
              <p>Изображение</p>
              <p>Наименование</p>
              <p>Цена</p>
              <p>Количество</p>
              <p>Сумма</p>
              <p>Удалить</p>
            </div>
            <hr />
            
            {foodList.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id}>
                    <div className='cartItemsTitle cartItemsItem'>
                      <img src={item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>{item.price} ₽</p>
                      <div className='cartCounter'>
                        <button onClick={() => decreaseItemQuantity(item._id)}>-</button>
                        <span>{cartItems[item._id]}</span>
                        <button onClick={() => addItemToCart(item._id)}>+</button>
                      </div>
                      <p>{item.price * cartItems[item._id]} ₽</p>
                      <button 
                        onClick={() => clearItemFromCart(item._id)}
                        className='cross'
                      >
                        <img src={assets.cross_icon} alt="Удалить" />
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="cartBottom">
            <div className="cartTotal">
              <h2>Итого</h2>
              <div>
                <div className="cartTotalDetails">
                  <p>Промежуточный итог</p>
                  <p>{getTotalCartAmount()} ₽</p>
                </div>
                <hr />
                <div className="cartTotalDetails">
                  <p>Доставка</p>
                  <p>
                    {getDeliveryPrice() === 300 
                      ? `${getDeliveryPrice()} ₽` 
                      : `(${Math.round((300 - getDeliveryPrice()) / 300 * 100)}%) ${getDeliveryPrice()} ₽`
                    }
                  </p>
                </div>
                <hr />
                <div className="cartTotalDetails">
                  <b>Общая сумма</b>
                  <b>{getTotalCartAmount() + getDeliveryPrice()} ₽</b>
                </div>
              </div>
              <button onClick={handleCheckout}>Оформить заказ</button>
            </div>

            <div className="cartPromocode">
              <p>Введите промокод</p>
              <div className="cartPromocodeInput">
                <input type="text" placeholder='Промокод' />
                <button>Применить</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;