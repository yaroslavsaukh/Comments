import { Router } from 'express'
import commentsController from '../controllers/comments.js'

const commentsRouter = Router()

commentsRouter.post('/create', commentsController.createComment)
commentsRouter.get('/list', commentsController.commentsList)
commentsRouter.get('/:id', commentsController.getById)

export default commentsRouter
