import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { AccountContext } from '../../context/AccountContext'
import './AuthPage.css'

const AuthPage = () => {
    const { login } = useContext(AccountContext)
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({ 
        login: '', 
        password: '' 
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const endpoint = isLogin ? '/accounts/login' : '/accounts/register'
            const response = await api.post(endpoint, formData)
            
            console.log('Server response:', response.data) // Логирование ответа
            
            if (isLogin) {
                if (response.data.token) {
                    const success = await login(response.data.token)
                    if (!success) {
                        setError('Ошибка сохранения авторизации')
                    }
                } else {
                    setError('Сервер не вернул токен')
                }
            } else {
                alert('Регистрация успешна! Теперь вы можете войти')
                setIsLogin(true)
                setFormData({ login: '', password: '' })
            }
        } catch (err) {
            const errorMsg = err.response?.data?.error || 
                            err.message || 
                            'Ошибка соединения'
            setError(errorMsg)
            console.error('Auth error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">{isLogin ? 'Вход' : 'Регистрация'}</h2>
                
                {error && <div className="auth-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-input-group">
                        <input
                            type="text"
                            name="login"
                            className="auth-input"
                            value={formData.login}
                            onChange={(e) => setFormData({...formData, login: e.target.value})}
                            placeholder="Логин"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="auth-input-group">
                        <input
                            type="password"
                            name="password"
                            className="auth-input"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Пароль"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Обработка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                
                <p 
                    className="auth-toggle"
                    onClick={() => !isLoading && setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                </p>
            </div>
        </div>
    )
}

export default AuthPage