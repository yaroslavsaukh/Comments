import authService from '../services/auth.js'
class authController {
  async register(req, res, next) {
    try {
      let avatar
      if (!req.files) {
        avatar = null
      } else {
        avatar = req.files.avatar
      }
      const { username, email, password } = req.body
      const data = { username, email, password, avatar }
      const user_token = await authService.createUser(data)
      return res.status(200).json({ user_token })
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const token = await authService.loginUser({ username, password })
      return res.status(200).json({ token })
    } catch (e) {
      next(e)
    }
  }
}

export default new authController()
