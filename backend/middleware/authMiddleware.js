const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler (async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. get token from user
            token = req.headers.authorization.split(' ')[1]

            // 2. verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // 3. get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }    
    }

    // if not token
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = protect