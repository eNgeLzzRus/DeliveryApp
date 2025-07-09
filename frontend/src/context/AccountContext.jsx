import React, { createContext, useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null)
    const [loading, setLoading] = useState(true)

    const verifyToken = async (token) => {
        try {
            const response = await api.post('/accounts/verify-token', { token })
            return response.data.isValid
        } catch (err) {
            console.warn("Ошибка проверки токена на сервере:", err.message)
            return false
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')
            const storedUserId = localStorage.getItem('userId')

            if (!token || !storedUserId) {
                setLoading(false)
                return
            }

            try {
                // Декодируем токен и проверяем срок действия
                const decoded = jwtDecode(token)

                if (Date.now() >= decoded.exp * 1000) {
                    console.warn("Токен истёк")
                    logout()
                    return
                }

                // Проверяем соответствие userId
                if (storedUserId !== String(decoded.id)) {
                    console.warn("ID пользователя не совпадает", { storedUserId, decodedId: decoded.id })
                    logout()
                    return
                }

                // Проверяем валидность токена на бэкенде
                const isValid = await verifyToken(token)
                if (!isValid) {
                    console.warn("Токен недействителен")
                    logout()
                    return
                }

                setUser({ token, id: storedUserId })
                setUserId(storedUserId)
            } catch (err) {
                console.error("Ошибка проверки авторизации:", err)
                logout()
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (userData) => {
        const { token } = userData
        if (!token) {
            console.error("Токен не получен")
            return
        }

        localStorage.setItem('token', token)

        const decoded = jwtDecode(token)
        const userIdStr = String(decoded.id)
        localStorage.setItem('userId', userIdStr)

        setUser({ token, id: userIdStr })
        setUserId(userIdStr)

        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setUser(null)
        setUserId(null)
        navigate('/auth')
    }

    return (
        <AccountContext.Provider value={{ user, login, logout, userId, loading }}>
            {!loading && children}
        </AccountContext.Provider>
    )
}