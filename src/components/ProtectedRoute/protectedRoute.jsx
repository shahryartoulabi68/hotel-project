import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'

function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    useEffect(() => {
        if (!isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])
    return isAuthenticated ? children : null;
}

export default ProtectedRoute
