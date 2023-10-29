import createHttpError from 'http-errors'
import { Router } from 'express'
import authRouter from './auth.js'
import commentsRouter from './comments.js'
import userRouter from './user.js'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/user', userRouter)

apiRouter.use(function (req, res, next) {
  throw createHttpError(404, 'Not Found')
})

export default apiRouter
