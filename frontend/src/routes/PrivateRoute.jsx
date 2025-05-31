import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AccountContext } from '../context/AccountContext'

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AccountContext)

    if (!user) {
        return <Navigate to="/auth" />
    }

    return children
}

export default PrivateRoute