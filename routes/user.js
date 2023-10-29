import { Router } from 'express'
import verifyToken from '../mv/verify-token.js'
import userController from '../controllers/user.js'

const userRouter = Router()

userRouter.get('/self', verifyToken, userController.getSelf)

export default userRouter
