
import axios from 'axios'

// Create one Axios instance for authentication APIs
const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

// Register a new user
export async function register(username, email, password) {
    try {
        const response = await api.post('/register', {
            username,
            email,
            password
        })

        // Return the backend's response data
        return response.data
    } catch (error) {
        // Backend returned an error response
        if (error.response) {
            throw new Error(
                error.response.data?.message || 'Registration failed'
            )
        }

        // Request was sent but no response was received
        if (error.request) {
            throw new Error(
                'Server se response nahi mila. Please check your connection.'
            )
        }

        // Something went wrong while preparing the request
        throw new Error(
            'Request bhejne mein problem hui. Please try again.'
        )
    }
}
