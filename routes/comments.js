import { Router } from 'express'
import commentsController from '../controllers/comments.js'
import verifyToken from '../mv/verify-token.js'

const commentsRouter = Router()

commentsRouter.post('/create', verifyToken, commentsController.createComment)
commentsRouter.get('/list', commentsController.commentsList)
commentsRouter.get('/:id', commentsController.getById)

export default commentsRouter
