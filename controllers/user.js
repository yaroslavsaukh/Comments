import userService from '../services/user.js'

class userController {
  async getSelf(req, res, next) {
    try {
      const { id } = req.user
      const user = await userService.userGetSelf(id)
      return res.status(200).json({ user })
    } catch (e) {
      next(e)
    }
  }
}

export default new userController()
