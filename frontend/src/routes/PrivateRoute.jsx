import React, { useContext } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { AccountContext } from '../context/AccountContext'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AccountContext);

    if (isLoading) {
        return <div>Загрузка...</div>; // Можно скелетон или спиннер
    }

    return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute