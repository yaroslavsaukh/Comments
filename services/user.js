import User from '../db/models/user.js'
import createHttpError from 'http-errors'

class userService {
  async userGetSelf(id) {
    try {
      return await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
      })
    } catch (e) {
      throw createHttpError(500, e)
    }
  }
}
export default new userService()
