import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { assets } from '../../assets/assets';
import './Cart.css'
import { AccountContext } from '../../context/AccountContext';
import OrderModal from '../../components/OrderModal/OrderModal';

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
        applyPromo,
        appliedPromo
    } = useContext(CartContext);

    const navigate = useNavigate();

    const [promoCode, setPromoCode] = useState('');
    const [promoMessage, setPromoMessage] = useState('');
    const [promoError, setPromoError] = useState('');
    const [recentOrder, setRecentOrder] = useState(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { userId } = useContext(AccountContext);

    const handleCheckout = async () => {
        console.log('Current userId:', userId);
        const clientId = userId; 
        const result = await checkout(clientId);
        if (result.success) {
            setShowModal(true);
        } else {
            alert(`Ошибка: ${result.error}`);
        }
    };

    const handleApplyPromo = async () => {
        const code = promoCode.trim();
        if (!code) return;

        const result = await applyPromo(code);

        if (result.success) {
            setPromoMessage(`✅ Промокод "${code}" активирован!`);
            setPromoError('');
        } else {
            setPromoMessage('');
            setPromoError(result.error || 'Неверный промокод');
        }

        setTimeout(() => {
            setPromoMessage('');
            setPromoError('');
        }, 3000);
    };

    const handleConfirmOrder = async () => {
        const result = await checkout();
        setShowModal(false);
        if (result.success) {
            const orderDetails = {
                items: cartItems,
                total: getTotalCartAmount() + getDeliveryPrice() - (appliedPromo?.discount || 0),
                appliedPromo,
            };
            setRecentOrder(orderDetails);
            setOrderConfirmed(true);
        } else {
            alert(`Ошибка: ${result.error}`); 
        }
    };

    if (orderConfirmed && recentOrder) {
        return (
            <div className="light-cart-container">
                <div className="light-empty-cart">
                    <h2 className="light-empty-title">СПАСИБО ЗА ЗАКАЗ!</h2>
                    <div className="light-underline"></div>
                    <p className="light-empty-text">Ваш заказ успешно оформлен:</p>

                    <ul className="light-order-list">
                        {foodList.map(item => {
                            const quantity = recentOrder.items[item._id];
                            if (quantity > 0) {
                                return (
                                    <li key={item._id} className="light-order-item">
                                        {item.name} x {quantity} — {item.price * quantity} ₽
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>

                    {recentOrder.appliedPromo && (
                        <p className="light-discount">Скидка: -{recentOrder.appliedPromo.discount.toFixed(2)} ₽</p>
                    )}

                    <p className="light-total"><strong>Итого: {recentOrder.total.toFixed(2)} ₽</strong></p>

                    <button
                        className="light-empty-button"
                        onClick={() => navigate('/')}
                    >
                        ПЕРЕЙТИ НА ГЛАВНУЮ
                    </button>
                </div>
            </div>
        );
    }

    if (Object.keys(cartItems).length === 0) {
        return (
            <div className="light-cart-container">
                <div className="light-empty-cart">
                    <h2 className="light-empty-title">ВАША КОРЗИНА ПУСТА</h2>
                    <div className="light-underline"></div>
                    <p className="light-empty-text">Добавьте что-нибудь вкусное из нашего меню</p>
                    <button
                        className="light-empty-button"
                        onClick={() => navigate('/menu')}
                    >
                        ПЕРЕЙТИ В МЕНЮ
                    </button>
                </div>
            </div>
        );
    }

    const finalTotal = getTotalCartAmount() + getDeliveryPrice() - (appliedPromo?.discount || 0);

    return (
        <div className="light-cart-container">
            <div className="light-cart-content">
                <div className="light-cart-header">
                    <h2 className="light-cart-title">ВАША КОРЗИНА</h2>
                    <div className="light-underline"></div>
                    <button
                        className="light-clear-button"
                        onClick={clearCart}
                    >
                        ОЧИСТИТЬ КОРЗИНУ
                    </button>
                </div>

                <div className="light-cart-items">
                    {foodList.map((item) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={item._id} className="light-cart-item">
                                    <div className="light-item-image">
                                        <img src={`http://localhost:3001/images/products/${item.image}`} alt={item.name} />
                                    </div>
                                    <div className="light-item-info">
                                        <h3 className="light-item-name">{item.name}</h3>
                                        <p className="light-item-price">{item.price} ₽ за шт.</p>
                                    </div>
                                    <div className="light-item-quantity">
                                        <button
                                            className="light-quantity-btn"
                                            onClick={() => decreaseItemQuantity(item._id)}
                                        >
                                            -
                                        </button>
                                        <span className="light-quantity-value">{cartItems[item._id]}</span>
                                        <button
                                            className="light-quantity-btn"
                                            onClick={() => addItemToCart(item._id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="light-item-total">{item.price * cartItems[item._id]} ₽</p>
                                    <button
                                        className="light-remove-btn"
                                        onClick={() => clearItemFromCart(item._id)}
                                    >
                                        <img src={assets.cross_icon} alt="Удалить" />
                                    </button>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                <div className="light-cart-summary">
                    <div className="light-promo-section">
                        <h3 className="light-promo-title">ПРОМОКОД</h3>
                        <div className="light-promo-input">
                            <input
                                type="text"
                                placeholder="Введите промокод"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button
                                className="light-promo-button"
                                onClick={handleApplyPromo}
                            >
                                ПРИМЕНИТЬ
                            </button>
                        </div>
                        {promoMessage && <p className="light-promo-message">{promoMessage}</p>}
                        {promoError && <p className="light-promo-error">{promoError}</p>}
                    </div>

                    <div className="light-total-section">
                        <h3 className="light-total-title">ИТОГО</h3>
                        <div className="light-total-details">
                            <div className="light-total-row">
                                <span>Промежуточный итог</span>
                                <span>{getTotalCartAmount().toFixed(2)} ₽</span>
                            </div>
                            <div className="light-total-row">
                                <span>Доставка</span>
                                <span>
                                    {getDeliveryPrice() === 300
                                        ? `${getDeliveryPrice()} ₽`
                                        : `(${Math.round((300 - getDeliveryPrice()) / 300 * 100)}%) ${getDeliveryPrice()} ₽`}
                                </span>
                            </div>
                            {appliedPromo && (
                                <div className="light-total-row">
                                    <span>Скидка</span>
                                    <span>-{appliedPromo.discount.toFixed(2)} ₽</span>
                                </div>
                            )}
                            <div className="light-total-divider"></div>
                            <div className="light-total-row light-grand-total">
                                <span>Общая сумма</span>
                                <span>{finalTotal.toFixed(2)} ₽</span>
                            </div>
                        </div>
                        <button
                            className="light-checkout-button"
                            onClick={() => setShowModal(true)}
                        >
                            ОФОРМИТЬ ЗАКАЗ
                        </button>
                    </div>
                </div>
            </div>
            <OrderModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmOrder}
                cartItems={cartItems}
                foodList={foodList}
                appliedPromo={appliedPromo}
                getTotalCartAmount={getTotalCartAmount}
                getDeliveryPrice={getDeliveryPrice}
            />
        </div>
    );
};

export default Cart;