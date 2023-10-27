import { comments, User } from '../db/models/models.js'
import createHttpError from 'http-errors'

class commentsService {
  async createNewComment(data) {
    try {
      const { body, parentId, author } = data
      const comment = await comments.create({
        comment_text: body,
        parent_comment_id: parentId,
        author_id: author,
      })
      return comment
    } catch (e) {
      throw createHttpError(500, e)
    }
  }
  async getListComments() {
    try {
      const list = await comments.findAll({
        where: { parent_comment_id: null },
      })
      return list
    } catch (e) {
      throw createHttpError(500, e)
    }
  }

  async getTestList() {
    try {
      const list = await comments.findAll({
        include: { all: true, nested: true },
      })
      return list
    } catch (e) {
      throw createHttpError(500, e)
    }
  }

  async getCommentByID(id) {
    try {
      return await comments.findByPk(id, {
        include: [
          {
            model: comments,
            as: 'replies',
            include: {
              model: comments,
              as: 'replies',
              include: {
                model: comments,
                as: 'replies',
              },
            },
          },
        ],
      })
    } catch (e) {
      throw createHttpError(500, e)
    }
  }
}

export default new commentsService()
