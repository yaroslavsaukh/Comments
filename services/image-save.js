import path from 'path'
import createHttpError from 'http-errors'
import moment from 'moment'
import generate_id from '../db/utils/generate-id.js'
import fs from 'fs'
import imageSize from 'image-size'
import sharp from 'sharp'

export const saveImage = async (file) => {
  try {
    const allowedTypes = ['jpg', 'png', 'gif']
    const typesArr = file.name.split('.')
    const type = typesArr[typesArr.length - 1]
    if (!allowedTypes.includes(type)) {
      throw createHttpError(400, 'Unsupported file type')
    }
    if (file.size >= 16777216) {
      throw createHttpError(400, 'Image size must be lower than 16MB')
    }
    const dimensions = imageSize(file.data)
    const maxWidth = 320
    const maxHeight = 240
    if (dimensions.width > maxWidth && dimensions.height > maxHeight) {
    }

    const fileName = String(moment().valueOf()) + generate_id(24) + `.${type}`
    if (!fs.existsSync('public/avatars')) fs.mkdirSync('public/avatars')
    const filePath = path.resolve('public/avatars', fileName)
    file.mv(filePath)
    return `avatars/${fileName}`
  } catch (e) {
    throw createHttpError(500, e)
  }
}
