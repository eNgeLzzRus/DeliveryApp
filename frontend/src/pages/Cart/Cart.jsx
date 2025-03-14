import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, clearCart, getDeliveryPrice } = useContext(StoreContext)

    const navigate = useNavigate();    

  return (
    <div className='cart'>
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
        {food_list.map((item, index)=>{
          if(cartItems[item._id]>0)
          {
            return (
              <div>
                <div className="cartItemsTitle cartItemsItem">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price} ₽</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]} ₽</p>
                  <button onClick={()=>removeFromCart(item._id)} className='cross'>Удалить</button>
                </div>
                <hr />
              </div>
            )
          }
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
              <p>{getTotalCartAmount() === 0?"Нет доставки": `${getDeliveryPrice()} ₽`} </p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Итого</b>
              <b>{getTotalCartAmount() === 0 ? "Нет доставки" : `${getTotalCartAmount() + getDeliveryPrice()} ₽`}</b>

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
  )
}

export default Cart
