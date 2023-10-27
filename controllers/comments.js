import commentsService from '../services/comments.js'

class commentsController {
  async createComment(req, res, next) {
    try {
      const { body, parentId, author } = req.body
      const comment = await commentsService.createNewComment({
        body,
        parentId,
        author,
      })
      return res.status(200).json({ comment })
    } catch (e) {
      next(e)
    }
  }
  async commentsList(req, res, next) {
    try {
      const list = await commentsService.getTestList()
      return res.status(200).json({ list })
    } catch (e) {
      next(e)
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const comment = await commentsService.getCommentByID(id)
      return res.status(200).json({ comment })
    } catch (e) {
      next(e)
    }
  }
}

export default new commentsController()
