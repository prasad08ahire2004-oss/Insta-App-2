import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/Login.scss'

function Login() {
    // Login successful hone par doosre page par jaane ke liye
    const navigate = useNavigate()

    // Context se login function aur loading state access kar rahe hain
    const { handleLogin, loading } = useAuth()

    // User ki input values store karne ke liye states
    // loginValue mein username ya email, dono mein se koi bhi aa sakta hai
    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')

    // Login ke dauran error ya success message dikhane ke liye
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Jab user login form submit karega, ye function chalega
    const handleSubmit = async (e) => {
        // Browser ko form submit karne par page reload karne se rokna
        e.preventDefault()

        // Purane messages clear karna
        setError('')
        setSuccess('')

        // Username/email ke aage-peeche ke spaces remove karna
        const cleanLoginValue = loginValue.trim()

        // Check karna ki dono fields fill ki gayi hain ya nahi
        if (!cleanLoginValue || !password) {
            setError('Please enter your username/email and password.')
            return
        }

        try {
            // Context ke handleLogin function ko username/email aur password dena
            // handleLogin aage auth.api.js ke login function ko call karega
            const response = await handleLogin(cleanLoginValue, password)

            // Backend se aaya success message dikhana
            setSuccess(response?.message || 'Login successful!')

            // Login successful hone par Feed page par jaana
            navigate('/feed', { replace: true })
        } catch (err) {
            // Login fail hone par error message screen par dikhana
            setError(err.message || 'Login failed. Please try again.')
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">

                {/* Login page ka heading */}
                <h1>Welcome Back</h1>

                <p className="login-description">
                    Login to continue to your account.
                </p>

                {/* 
                    Agar error state mein message hai,
                    toh error box screen par show hoga.
                */}
                {error && (
                    <div className="login-error" role="alert">
                        <strong>Login failed</strong>
                        <p>{error}</p>
                    </div>
                )}

                {/* Successful login ka message */}
                {success && (
                    <div className="login-success" role="status">
                        {success}
                    </div>
                )}

                {/* Form submit hone par handleSubmit function chalega */}
                <form onSubmit={handleSubmit} noValidate>

                    {/* Username ya email input */}
                    <div className="form-group">
                        <label htmlFor="loginValue">
                            Username or Email
                        </label>

                        <input
                            id="loginValue"
                            name="loginValue"
                            type="text"
                            placeholder="Enter your username or email"
                            autoComplete="username"
                            value={loginValue}

                            // Input change hone par state update karna
                            onChange={(e) => {
                                setLoginValue(e.target.value)
                                setError('')
                            }}

                            // Request chalne par input disable karna
                            disabled={loading}
                        />
                    </div>

                    {/* Password input */}
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={password}

                            // Input change hone par password state update karna
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError('')
                            }}

                            disabled={loading}
                        />
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {/* Loading ke according button ka text change hoga */}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

                {/* Register page par jaane ka link */}
                <p className="login-footer">
                    Don't have an account?{' '}
                    <Link to="/register">Create an account</Link>
                </p>

            </div>
        </div>
    )
}

export default Login
