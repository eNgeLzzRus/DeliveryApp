// components/PrivateRoute.jsx

import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AccountContext } from '../context/AccountContext'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AccountContext)

    if (loading) {
        return <div>Загрузка...</div> // или спиннер
    }

    if (!user) {
        return <Navigate to="/auth" />
    }

    return children
}

export default PrivateRoute