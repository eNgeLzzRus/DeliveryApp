// src/context/AccountContext.jsx

import React, { createContext, useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')
            const storedUserId = localStorage.getItem('userId')

            console.log('--- Проверка токена ---')
            console.log('Token:', token)
            console.log('Stored userId:', storedUserId)

            if (token && storedUserId) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]))
                    const idFromToken = payload.id

                    // Добавим проверку exp (время жизни токена)
                    const exp = payload.exp
                    if (Date.now() >= exp * 1000) {
                        console.warn('Токен истёк')
                        logout()
                        return
                    }

                    console.log('ID из токена:', idFromToken)
                    console.log('Сравнение ID:', storedUserId, String(idFromToken))

                    // Приводим оба к строке для корректного сравнения
                    if (storedUserId === String(idFromToken)) {
                        setUser({ token, id: storedUserId })
                        setUserId(storedUserId)
                        console.log('Авторизация успешна')
                    } else {
                        console.warn('ID из токена не совпадает со storedUserId. Выполняю logout.')
                        logout()
                    }
                } catch (err) {
                    console.error('Ошибка при декодировании токена:', err)
                    logout()
                }
            } else {
                console.log('Токен или userId отсутствуют')
            }

            setLoading(false)
        }

        checkAuth()
    }, [])

    const login = (userData) => {
        const { token } = userData
        localStorage.setItem('token', token)

        const payload = JSON.parse(atob(token.split('.')[1]))
        const id = payload.id

        // Сохраняем userId как строку, чтобы сравнение было стабильным
        const userIdStr = String(id)
        localStorage.setItem('userId', userIdStr)
        setUserId(userIdStr)
        setUser({ token, id: userIdStr })

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