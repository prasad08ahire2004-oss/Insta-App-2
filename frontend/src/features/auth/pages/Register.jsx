
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/Register.scss'

function Register() {
    const navigate = useNavigate()
    const { handleRegister, loading } = useAuth()
   // Yahan useAuth() se Context ki value milti hai. Hum usmein se sirf handleRegister aur loading nikaal rahe hain.

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        const cleanUsername = username.trim()
        const cleanEmail = email.trim().toLowerCase()

        // Check empty fields
        if (!cleanUsername || !cleanEmail || !password) {
            setError('Please fill in all fields.')
            return
        }

        // Check username length
        if (cleanUsername.length < 3 || cleanUsername.length > 30) {
            setError('Username must be between 3 and 30 characters.')
            return
        }

        // Check email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailPattern.test(cleanEmail)) {
            setError('Please enter a valid email address.')
            return
        }

        // Check password length
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.')
            return
        }

        try {
            const response = await handleRegister(
                cleanUsername,
                cleanEmail,
                password
            )

            /*
            Yahan teen values handleRegister() ko di ja rahi hain:
                1. cleanUsername
                2. cleanEmail
                3. password
            Ye function tumhare auth.context.jsx mein bana hua hai. Wahan se registration request auth.api.js tak jaati hai.
            await ka matlab hai ki JavaScript is function ke result ka wait karega, aur uska successful result response mein milega.
            Agar registration successful hota hai, toh:
            */

            setSuccess(response?.message || 'Registration successful!')
            //Success message set hota hai aur user /feed page par navigate karta hai.
            //Agar registration fail hota hai, toh catch chalta hai

            navigate('/feed', { replace: true })
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.')
        }
    }

    return (
        <div className="register-page">

            <div className="register-container">

                <h1>Create Account</h1>

                <p className="register-description">
                    Join us and start sharing your moments.
                </p>

                {error && (
                    <div className="register-error" role="alert">
                        <strong>Registration failed</strong>
                        <p>{error}</p>
                    </div>
                )}

                {/* Iska matlab hai: agar error ki value empty nahi hai, toh error box show karo.
                Maan lo backend ye message bhejta hai:
                An account with this email already exists
                Toh error state mein ye message save hoga aur page par dikhai dega. */}

                {success && (
                    <div className="register-success" role="status">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group">

                        <label htmlFor="username">Username</label>

                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Choose a username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError('')
                            }}
                            minLength={3}
                            maxLength={30}
                            disabled={loading}
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setError('')
                            }}
                            disabled={loading}
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError('')
                            }}
                            minLength={8}
                            disabled={loading}
                        />

                        <small>Password must be at least 8 characters.</small>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                </form>

                <p className="register-footer">
                    Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </p>

            </div>
            
        </div>
    )
}

export default Register