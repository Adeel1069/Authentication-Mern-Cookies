import express from 'express'
import { authUser, logoutUser, registerUser, getUserProfile, updateUserProfile, getAllUsersProfile, deleteAllUsers } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, getAllUsersProfile).delete(protect, deleteAllUsers)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router;