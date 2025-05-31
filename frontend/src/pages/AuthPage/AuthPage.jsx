// src/pages/AuthPage.jsx

import React, { useState, useContext } from 'react'
import './AuthPage.css'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { AccountContext } from '../../context/AccountContext'
import { CartContext } from '../../context/CartContext'

const AuthPage = () => {
    const { login } = useContext(AccountContext)
    const [currState, setCurrState] = useState("Авторизация")
    const [formData, setFormData] = useState({ login: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = currState === "Авторизация" ? '/accounts/login' : '/accounts/register'

        try {
            const res = await api.post(url, {
                login: formData.login,
                password: formData.password
            })

            if (res.status === 200 || res.status === 201) {
                if (currState === "Авторизация") {
                    const { token } = res.data
                    login({ token }) // Теперь id берётся из токена
                    navigate('/')
                } else {
                    alert('Аккаунт создан!')
                    setCurrState("Авторизация")
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Ошибка сервера'
            alert(errorMessage)
        }
    }

    return (
        <div className='authPage'>
            <form onSubmit={handleSubmit} className="authContainer">
                <h2>{currState}</h2>
                <div className="authInputs">
                    <input
                        type="text"
                        placeholder='Логин'
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Пароль'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    {currState === "Регистрация" ? "Создать аккаунт" : "Войти"}
                </button>

                <p onClick={() => setCurrState(currState === "Авторизация" ? "Регистрация" : "Авторизация")}>
                    {currState === "Авторизация"
                        ? "Нет аккаунта? Зарегистрируйтесь"
                        : "Уже есть аккаунт? Войдите"}
                </p>
            </form>
        </div>
    )
}

export default AuthPage