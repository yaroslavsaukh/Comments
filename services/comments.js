import Comments from '../db/models/comment.js'
import User from '../db/models/user.js'
import createHttpError from 'http-errors'

class commentsService {
  async createNewComment(data) {
    try {
      const { text, parentId, UserId } = data
      return await Comments.create({
        text,
        parentId,
        UserId,
      })
    } catch (e) {
      throw createHttpError(500, e)
    }
  }
  async getListComments(data) {
    try {
      const { limit, offset, sortBy, sortOrder } = data
      const order = []
      if (
        typeof sortBy === 'string' &&
        (sortOrder === 'ASC' || sortOrder === 'DESC')
      ) {
        order.push([sortBy || 'id', sortOrder || 'ASC'])
      } else {
        throw createHttpError(500, `Incorrect parameter`)
      }
      const list = await Comments.findAndCountAll({
        where: { parentId: null },
        attributes: { exclude: ['UserId'] },
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
        ],
        limit: limit || 25,
        offset: offset * limit || 0,
        order: order,
      })
      return list
    } catch (e) {
      throw createHttpError(500, e)
    }
  }

  async getCommentByID(id) {
    try {
      const comment = await Comments.findOne({
        where: { id },
        attributes: { exclude: ['UserId'] },
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      })
      if (!comment) {
        throw createHttpError(500, `Can't find comment with id ${id}`) // Комментарий не найден
      }
      if (comment.parentId !== null) {
        throw createHttpError(
          500,
          `Incorrect Id, comment parentId must be null`,
        )
      }
      const buildCommentTree = (parentId) => {
        const replies = comments.filter((c) => c.parentId === parentId)
        if (replies.length === 0) {
          return []
        }
        return replies.map((reply) => ({
          ...reply.toJSON(),
          children: buildCommentTree(reply.id),
        }))
      }

      const comments = await Comments.findAll({ include: 'User' })
      const commentTree = buildCommentTree(comment.id)

      return {
        comment: comment.toJSON(),
        replies: commentTree,
      }
    } catch (e) {
      throw createHttpError(500, e)
    }
  }
}

export default new commentsService()
