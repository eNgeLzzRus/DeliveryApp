import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { useMenu } from '../../context/menuContext'
import { assets } from '../../assets/assets'

const Cart = () => {

    const { cartItems, addToCart, food_list, removeFromCart, getTotalCartAmount, clearCart, getDeliveryPrice } = useContext(StoreContext)

    const navigate = useNavigate();    

    const { updateMenu } = useMenu()

  return (  
    <div className='cart'>
      {getTotalCartAmount() === 0 ?
        <div className='cleanCart'>
          <h1>Корзина пуста</h1>
          <button onClick={() => {navigate('/Menu'), updateMenu("Меню")}}>Перейти к покупкам</button>
        </div>
        :
        <div>
          <div className='cartRemoveItems'>
        <button onClick={()=>clearCart()}>Очистить</button>
      </div>
      <div className="cartItems">
        <div className="cartItemsTitle">
          <p>Позиция меню</p>
          <p>Наименование</p>
          <p>Цена</p>
          <p>Количество</p>
          <p>Всего</p>
          <p>Удалить</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id}>
                    <div className='cartItemsTitle cartItemsItem'>
                      <img src={item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>{item.price} ₽</p>
                      <div className='cartCounter'>
                        <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt='Remove' />
                        <span>{cartItems[item._id]}</span>
                        <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt='Add' />
                      </div>
                      <p>{item.price * cartItems[item._id]} ₽</p>
                      <button onClick={() => removeFromCart(item._id)} className='cross'>Удалить</button>
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
              <p>Стоимость доставки</p>
              <p>{getDeliveryPrice() === 300? `${getDeliveryPrice()} ₽` : `(${- Math.round(((300 - getDeliveryPrice()) / 300)*100)}%) ${getDeliveryPrice()} ₽`}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Итого</b>
              <b>{getTotalCartAmount() + getDeliveryPrice() } ₽</b>

            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Перейти к оформлению</button>
        </div>
        <div className="cartPromocode">
          <div>
            <p>Введите промокод</p>
            <div className="cartPromocodeInput">
              <input type="text" placeholder='Промокод' />
              <button>Применить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      }
    </div>
  ) 
}

export default Cart
