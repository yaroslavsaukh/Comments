import createHttpError from 'http-errors'
import { imageSave } from './image-save.js'
import User from '../db/models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateAccessToken = async (id, username, email, createdAt) => {
  const payload = {
    id,
    username,
    email,
    createdAt,
  }
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })
}
class authService {
  async createUser(data) {
    try {
      let filename
      if (data.avatar === null) {
        filename = null
      } else {
        filename = await imageSave(data.avatar)
      }
      const { username, email, password } = data
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/
      if (!passwordRegex.test(password))
        throw createHttpError(
          400,
          'Too weak password. Password must contain at least 6 symbols, ' +
            'one upper letter, one lower letter, one number and one special symbol(!@#$%^&*()_+)',
        )
      const hashedPassword = bcrypt.hashSync(password, 7)
      const checkEmail = await User.findOne({
        where: { email: email },
      })
      if (checkEmail) {
        throw createHttpError(400, `User with this email actually exists`)
      }
      const checkUsername = await User.findOne({
        where: { username: username },
      })
      if (checkUsername) {
        throw createHttpError(400, `User with this username actually exists`)
      }
      const user = await User.create({
        username,
        password: hashedPassword,
        email,
        avatar: filename,
      })
      return await generateAccessToken(
        user.id,
        user.username,
        user.email,
        user.createdAt,
      )
    } catch (e) {
      throw createHttpError(500, e)
    }
  }

  async loginUser(data) {
    try {
      const { username, password } = data
      const user = await User.findOne({ where: { username: username } })
      if (!user) {
        throw createHttpError(400, `User ${data.email} not find`)
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        throw createHttpError(400, `Invalid password`)
      }
      return await generateAccessToken(
        user.id,
        user.username,
        user.email,
        user.createdAt,
      )
    } catch (e) {
      throw createHttpError(500, e)
    }
  }
}
export default new authService()
