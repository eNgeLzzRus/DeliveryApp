// context/AccountContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './CartContext'

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    // Убрали зависимость от CartContext

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId') // Получаем напрямую
            if (token) {
                try {
                    const res = await api.get('/accounts/profile')
                    setUser({ ...res.data, id: userId })
                } catch (err) {
                    console.error('Ошибка авторизации:', err)
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    setUser(null)
                }
            }
        }
        checkAuth()
    }, [])

    const login = async (userData) => {
        const { token } = userData;
        localStorage.setItem('token', token);
        
        // Декодируем токен чтобы получить id
        const payload = JSON.parse(atob(token.split('.')[1]));
        const id = payload.id;
        
        localStorage.setItem('userId', id);
        setUser({ token, id });
        setUserId(id); // Если нужно в CartContext
        console.log(id)
        navigate('/');
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setUser(null)
        navigate('/auth')
    }

    return (
        <AccountContext.Provider value={{ user, login, logout, userId, setUserId }}>
            {children}
        </AccountContext.Provider>
    )
}