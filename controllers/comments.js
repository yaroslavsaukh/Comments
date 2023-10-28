import commentsService from '../services/comments.js'

class commentsController {
  async createComment(req, res, next) {
    try {
      const { id } = req.user
      const { text, parentId } = req.body
      const comment = await commentsService.createNewComment({
        text,
        parentId,
        UserId: id,
      })
      return res.status(200).json({ comment })
    } catch (e) {
      next(e)
    }
  }
  async commentsList(req, res, next) {
    try {
      const { limit, offset } = req.query
      const list = await commentsService.getListComments(req.query)
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
