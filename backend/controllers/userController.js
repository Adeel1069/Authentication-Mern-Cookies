import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profileImg } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400).json({ message: 'User already exist' })
        return;
    }

    const user = await User.create({ name, email, password, profileImg })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImg: user.profileImg
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc    Auth user / set token
// @route   POST api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImg: user.profileImg
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Logout user
// @route   POST api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: 'User Logged Out'
    })
})

// @desc    Registered user profile
// @route   Get api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileImg: req.user.profileImg
    }
    res.status(200).json(user)
})

// @desc    Update registered user profile
// @route   PUT api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {

    let user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.profileImg = req.body.profileImg || user.profileImg
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImg: updatedUser.profileImg,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }


})

// @desc    Get all registered profiles except logged in user
// @route   GET api/users
// @access  Private
const getAllUsersProfile = asyncHandler(async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user._id } }).sort({ createdAt: -1 })
    const counts = await User.countDocuments()
    res.status(200).json({
        count: counts - 1, // as we are not including current user - alternatively use users.length
        users: users
    })
})

// @desc    Get all registered profiles except logged in user
// @route   Delete api/users
// @access  Private
const deleteAllUsers = asyncHandler(async (req, res) => {
    const response = await User.deleteMany()
    if (response) {
        res.status(200).json({
            message: 'All users have been deleted.'
        })
    } else {
        res.status(500).json({ message: 'Something went wrong' })
    }
})


export {
    authUser, logoutUser, registerUser, getUserProfile, updateUserProfile, getAllUsersProfile, deleteAllUsers
}