import React, { createContext, useContext } from 'react'
import { useReducer } from 'react';

const AuthContext = createContext()

const initioalState = {
    user: null,
    isAuthenticated: false
}

function authReduser(state, action) {
    switch (action.type) {
        case "login": return {
            user: action.payload,
            isAuthenticated: true
        }
        case "logout": return {
            user: null,
            isAuthenticated: false
        }
        default: throw new Error("unknown action")
    }
}

const FAKE_USER = {
    name: "shahryar",
    email: "shahryar@gamil.com",
    password: "1234"
}

function AuthContextProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(authReduser, initioalState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: "login", payload: FAKE_USER })
    }

    function logout() {
        dispatch({ type: "logout" })
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

export function useAuth() {
    return useContext(AuthContext)
}