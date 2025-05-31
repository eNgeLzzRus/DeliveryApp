import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../context/AccountContext'
import api from '../api'

const Profile = () => {
    const { user } = useContext(AccountContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get(`/orders?client=${user.id}`)
                setOrders(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchOrders()
    }, [user])

    return (
        <div className="profile">
            <h2>Профиль</h2>
            <p>ID: {user.id}</p>
            <h3>Ваши заказы:</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.OrdID}>
                        Заказ #{order.OrdID}, сумма: {order.Price} ₽
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile