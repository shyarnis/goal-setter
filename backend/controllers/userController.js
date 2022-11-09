const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body      // destructing

    // 1. if not one of them, throw error
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    // 2. Find user by email
    const userExits = await User.findOne({ email })

    // 3. if already exists, throw error
    if (userExits) {
        res.status(400)
        throw new Error('User already exits')
    }
    
    // password need to hash with salt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // // 4. User is created with hashed password
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    // 6. if user is created, send user data as json else throw error
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid data user')
    }
})
 

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    // 1. check by user email
    const user = await User.findOne({ email })

    // 2. if user and password match send json, else throw error
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
    res.json({message: "Get user display"})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}