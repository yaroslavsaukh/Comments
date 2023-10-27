import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import Roles from '../db/models/roles'
import { userStatus } from '../enums/index.js'

export default (req, _, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization) throw createHttpError(401, 'Unauthorized')

    const splitedToken = authorization?.split(' ')
    const bearer = splitedToken[0]
    if (!bearer) throw createHttpError(401, 'Invalid token')

    const token = splitedToken[1]
    if (!token) throw createHttpError(401, 'Invalid token')
    const secret = process.env.SECRET
    jwt.verify(token, secret, async (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return next(createHttpError(401, 'Token expired'))
        } else {
          console.log(err.name)
          return next(createHttpError(401, 'Invalid token'))
        }
      }
      if (user.status === userStatus.BLOCKED)
        return next(createHttpError(401, 'User blocked'))
      if (req.baseUrl.includes('/admin-api')) {
        const adminRole = await Roles.findOne({ name: 'ADMIN' })
        if (adminRole && user.role !== String(adminRole._id)) {
          return next(createHttpError(403, 'User is not admin'))
        }
      }
      req.user = user

      next()
    })
  } catch (error) {
    throw createHttpError(error)
  }
}
