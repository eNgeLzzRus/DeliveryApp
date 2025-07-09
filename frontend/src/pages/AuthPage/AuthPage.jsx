import React, { useState, useContext, useEffect } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { AccountContext } from '../../context/AccountContext';
import { assets } from '../../assets/assets';

const AuthPage = () => {
    const { login } = useContext(AccountContext);
    const [currState, setCurrState] = useState("Авторизация");
    const [formData, setFormData] = useState({ login: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        // Добавляем класс при монтировании
        document.body.classList.add('auth-page-open');
        
        // Убираем класс при размонтировании
        return () => {
            document.body.classList.remove('auth-page-open');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currState === "Авторизация" ? '/accounts/login' : '/accounts/register';

        try {
            const res = await api.post(url, {
                login: formData.login,
                password: formData.password
            });

            if (res.status === 200 || res.status === 201) {
                if (currState === "Авторизация") {
                    const { token } = res.data;
                    login({ token });
                    navigate('/');
                } else {
                    alert('Аккаунт создан!');
                    setCurrState("Авторизация");
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Ошибка сервера';
            alert(errorMessage);
        }
    };

    return (
        <div className='pm-auth-page'>
            <div className="pm-auth-container">
                <div className="pm-auth-header">
                    <img src={assets.logo} alt="Логотип" className="pm-auth-logo" />
                    <h2>{currState}</h2>
                    <div className="pm-underline"></div>
                </div>
                
                <form onSubmit={handleSubmit} className="pm-auth-form">
                    <div className="pm-auth-inputs">
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
                    <button type="submit" className="pm-auth-button">
                        {currState === "Регистрация" ? "Создать аккаунт" : "Войти"}
                    </button>

                    <p className="pm-auth-toggle" onClick={() => setCurrState(currState === "Авторизация" ? "Регистрация" : "Авторизация")}>
                        {currState === "Авторизация"
                            ? "Нет аккаунта? Зарегистрируйтесь"
                            : "Уже есть аккаунт? Войдите"}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;