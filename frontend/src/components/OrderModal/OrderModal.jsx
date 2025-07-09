import React from 'react';
import { useState } from 'react';
import './OrderModal.css'

const OrderModal = ({ isOpen, onClose, onConfirm, cartItems, foodList, appliedPromo, getTotalCartAmount, getDeliveryPrice }) => {
    if (!isOpen) return null;

    const finalTotal = getTotalCartAmount() + getDeliveryPrice() - (appliedPromo?.discount || 0);

    return (
        <div className="light-neon-modal-overlay" onClick={onClose}>
            <div className="light-neon-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Подтвердите заказ</h2>
                <p>Вы действительно хотите оформить заказ?</p>

                <div className="light-neon-order-summary">
                    <h4>Ваш заказ:</h4>
                    {foodList.map((item) => {
                        const quantity = cartItems[item._id];
                        if (quantity > 0) {
                            return (
                                <div key={item._id} className="light-neon-order-item">
                                    <span>{item.name} x {quantity}</span>
                                    <span>{item.price * quantity} ₽</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <hr />
                    {appliedPromo && (
                        <div className="light-neon-order-row">
                            <strong>Скидка:</strong>
                            <span>-{appliedPromo.discount.toFixed(2)} ₽</span>
                        </div>
                    )}
                    <div className="light-neon-order-row">
                        <strong>Доставка:</strong>
                        <span>{getDeliveryPrice()} ₽</span>
                    </div>
                    <div className="light-neon-order-row total">
                        <strong>Итого:</strong>
                        <span>{finalTotal.toFixed(2)} ₽</span>
                    </div>
                </div>

                <div className="light-neon-modal-buttons">
                    <button
                        className="light-neon-modal-confirm"
                        onClick={onConfirm}
                    >
                        ОФОРМИТЬ ЗАКАЗ
                    </button>
                    <button
                        className="light-neon-modal-cancel"
                        onClick={onClose}
                    >
                        ОТМЕНА
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;