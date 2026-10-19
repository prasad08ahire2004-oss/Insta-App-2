import { createContext, useState } from "react"
import { register , login } from "./services/auth.api"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleRegister = async (username, email, password) => {
        setLoading(true)

        try {
            const response = await register(username, email, password)
            setUser(response.user)
            return response
        } catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (username, password) => {
        setLoading(true)

        try {
            const response = await login(username, password)
            setUser(response.user)
            return response
        } catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                handleRegister,
                handleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}