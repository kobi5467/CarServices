import express from 'express'

import { login, resetPassword, sendForgotPasswordEmail, signup } from '../controllers/users.js'

const router = express.Router();

// Login
router.post('/login', login)

// Create User
router.post('/sign-up', signup)

// Forgot Password - Getting email and send reset password link to email.
router.post('/forgot-password', sendForgotPasswordEmail)

// Forgot Password - Reset Password
router.put('/forgot-password', resetPassword)

export default router;