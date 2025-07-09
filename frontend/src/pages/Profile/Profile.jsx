import React, { useContext, useState, useEffect } from 'react'
import './Profile.css'
import { AccountContext } from '../../context/AccountContext'
import api from '../../api'

const Profile = () => {
    const { user, logout, userId } = useContext(AccountContext)
    const [clientData, setClientData] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setError("Пользователь не авторизован")
                setLoading(false)
                return
            }

            try {
                let clientResponse
                try {
                    clientResponse = await api.get(`/clients/account/${userId}`)
                    setClientData(clientResponse.data)
                } catch (clientError) {
                    console.warn('Client data not found')
                    setClientData({ Address: 'Не указан' })
                }

                try {
                    const ordersResponse = await api.get(`/orders/client/${userId}`)
                    setOrders(ordersResponse.data || [])
                } catch (ordersError) {
                    console.warn('No orders found')
                    setOrders([])
                }
            } catch (err) {
                console.error('Ошибка загрузки профиля:', err)
                setError(err.response?.data?.error || "Не удалось загрузить данные профиля")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [userId])

    if (loading) return <div className="profile-loading">Загрузка...</div>

    return (
        <div className="profile-container">
            <h1>Профиль</h1>
            {error && <div className="profile-error">{error}</div>}
            <div className="profile-card">
                <h2>Информация о клиенте</h2>
                <p><strong>Логин:</strong> {user?.id ? `Пользователь #${user.id}` : 'Не указан'}</p>
                <p><strong>Адрес:</strong> {clientData?.Address || 'Не указан'}</p>
            </div>
            <div className="profile-orders">
                <h2>Ваши заказы</h2>
                {orders.length > 0 ? (
                    <ul>
                        {orders.map(order => (
                            <li
                                key={order.OrdID}
                                className="order-item"
                                style={{ cursor: 'pointer' }}
                            >
                                <span><strong>ID заказа:</strong> {order.OrdID}</span>
                                <span><strong>Дата:</strong> {new Date(order.Date).toLocaleString()}</span>
                                <span><strong>Сумма:</strong> {order.TotalPrice} ₽</span>
                                <span><strong>Статус:</strong> {order.StatusName}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>У вас пока нет заказов.</p>
                )}
            </div>
            <button className="logout-button" onClick={logout}>
                Выйти
            </button>
        </div>
    )
}

export default Profile