import expressAsyncHandler from "express-async-handler"
import jwt from "jsonwebtoken";
import User from '../models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt;

    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Unauthorized, invalid token")
        }
    } else {
        res.status(401)
        throw new Error('Unauthorized, no token')
    }
})

export {
    protect
}