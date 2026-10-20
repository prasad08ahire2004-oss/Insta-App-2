const jwt = require('jsonwebtoken')

// Token se logged-in user ki identity verify karna
async function identifyUser(req, res, next) {

    // Step 1: Cookie se token lena
    const token = req.cookies?.token

    // Step 2: Token nahi mila toh request reject karna
    if (!token) {
        return res.status(401).json({
            message: 'Token not provided. Unauthorized access.'
        })
    }

    // Step 3: JWT_SECRET available hai ya nahi check karna
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is missing in environment variables')

        return res.status(500).json({
            message: 'Internal server error'
        })
    }

    let decoded

    try {
        // Step 4: Token verify karna aur uska payload decode karna
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {

        // Step 5: Token invalid ya expired hai toh request reject karna
        return res.status(401).json({
            message: 'Invalid or expired token. Unauthorized access.'
        })
    }

    // Step 6: Check karna ki token mein user ID hai
    if (!decoded || !decoded.id) {
        return res.status(401).json({
            message: 'Invalid token payload.'
        })
    }

    // Step 7: Verified user ki information request ke saath attach karna
    req.user = decoded

    // Step 8: Request ko next middleware ya controller tak bhejna
    next()
}

module.exports = identifyUser