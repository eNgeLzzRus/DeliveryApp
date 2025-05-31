import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        token: null,
        userId: null,
        isAuthenticated: false,
        isLoading: true
    });

    // Проверка токена при загрузке
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setAuthState({
                    token: null,
                    userId: null,
                    isAuthenticated: false,
                    isLoading: false
                });
                return;
            }

            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (isExpired) {
                    localStorage.removeItem('token');
                    throw new Error('Token expired');
                }

                setAuthState({
                    token,
                    userId: decoded.id,
                    isAuthenticated: true,
                    isLoading: false
                });
            } catch (err) {
                console.error('Auth check error:', err);
                localStorage.removeItem('token');
                setAuthState({
                    token: null,
                    userId: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            }
        };

        checkAuth();
    }, []);

    const login = async (token) => {
        try {
            const decoded = jwtDecode(token);
            localStorage.setItem('token', token);

            setAuthState({
                token,
                userId: decoded.id,
                isAuthenticated: true,
                isLoading: false
            });

            navigate('/');
            return { success: true };
        } catch (err) {
            console.error('Login error:', err);
            logout();
            return { success: false, error: 'Invalid token' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            userId: null,
            isAuthenticated: false,
            isLoading: false
        });
        navigate('/auth');
    };

    return (
        <AccountContext.Provider value={{
            userId: authState.userId,
            isAuthenticated: authState.isAuthenticated,
            isLoading: authState.isLoading,
            token: authState.token,
            login,
            logout
        }}>
            {!authState.isLoading && children}
        </AccountContext.Provider>
    );
};