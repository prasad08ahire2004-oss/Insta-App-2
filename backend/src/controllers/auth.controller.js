const userModel = require('../models/user.model')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerController(req, res) {
    try {
        // 1. Check whether request body exists
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
            return res.status(400).json({
                message: 'Please provide registration details'
            })
        }

        // 2. Get and validate the input fields
        const { username, email, password } = req.body

        if (typeof username !== 'string' || !username.trim()) {
            return res.status(400).json({
                message: 'Username is required'
            })
        }

        if (typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({
                message: 'Email is required'
            })
        }

        if (typeof password !== 'string' || !password.trim()) {
            return res.status(400).json({
                message: 'Password is required'
            })
        }

        // 3. Normalize username and email
        const normalizedUsername = username.trim().toLowerCase()
        const normalizedEmail = email.trim().toLowerCase()

        // 4. Validate username
        if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
            return res.status(400).json({
                message: 'Username must be between 3 and 30 characters'
            })
        }

        // 5. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                message: 'Please enter a valid email address'
            })
        }

        // 6. Validate password
        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long'
            })
        }

        if (Buffer.byteLength(password, 'utf8') > 72) {
            return res.status(400).json({
                message: 'Password is too long'
            })
        }

        // 7. Check whether username or email already exists
        const existingUser = await userModel.findOne({
            $or: [
                { username: normalizedUsername },
                { email: normalizedEmail }
            ]
        }).select('username email')

        if (existingUser) {
            if (existingUser.email === normalizedEmail) {
                return res.status(409).json({
                    message: 'An account with this email already exists'
                })
            }

            if (existingUser.username === normalizedUsername) {
                return res.status(409).json({
                    message: 'This username is already taken'
                })
            }
        }

        // 8. Check JWT configuration before creating the account
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is missing from environment configuration')

            return res.status(500).json({
                message: 'Registration is temporarily unavailable'
            })
        }

        // 9. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // 10. Create the user
        const user = await userModel.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password: hashedPassword
        })

        // 11. Create authentication token
        const token = jwt.sign(
            {
                id: user._id.toString(),
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        // 12. Set authentication cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        })

        // 13. Send safe user details
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        // 14. Handle duplicate-key errors
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern || {})[0]

            if (duplicateField === 'email') {
                return res.status(409).json({
                    message: 'An account with this email already exists'
                })
            }

            if (duplicateField === 'username') {
                return res.status(409).json({
                    message: 'This username is already taken'
                })
            }

            return res.status(409).json({
                message: 'An account with these details already exists'
            })
        }

        // 15. Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(
                (item) => item.message
            )

            return res.status(400).json({
                message: messages[0] || 'Invalid registration details'
            })
        }

        // 16. Log internal errors, but do not expose them to users
        console.error('Registration error:', error)

        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}



module.exports = {
    registerController
}