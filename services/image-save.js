import path from 'path'
import createHttpError from 'http-errors'
import moment from 'moment'
import generate_id from '../db/utils/generate-id.js'
import fs from 'fs'
import sharp from 'sharp'

export const imageSave = async (file) => {
  const { data } = file
  const allowedTypes = ['jpg', 'png', 'gif']
  const typesArr = file.name.split('.')
  const type = typesArr[typesArr.length - 1]
  if (!allowedTypes.includes(type)) {
    throw createHttpError(400, 'Unsupported file type')
  }
  if (file.size >= 16777216) {
    throw createHttpError(400, 'Image size must be lower than 16MB')
  }
  if (!fs.existsSync('public/avatars')) fs.mkdirSync('public/avatars')
  const maxWidth = 320
  const maxHeight = 240
  const uploadPath = 'public/avatars'
  const image = sharp(data)

  const imageInfo = await image.metadata()
  if (imageInfo.width > maxWidth || imageInfo.height > maxHeight) {
    // Уменьшаем изображение
    await image.resize(maxWidth, maxHeight, {
      fit: 'inside', // Пропорциональное изменение размера с сохранением соотношения сторон
      withoutEnlargement: true, // Не увеличивать изображение
    })
    // Генерируем уникальное имя файла
    const fileName = String(moment().valueOf()) + generate_id(24) + `.${type}`
    // Сохраняем уменьшенное изображение
    await image.toFile(path.join(uploadPath, fileName))

    return `avatars/${fileName}`
  }

  // Если изображение не нуждается в изменении размера, сохраняем его как есть
  const fileName = String(moment().valueOf()) + generate_id(24) + `.${type}`
  fs.writeFileSync(path.join(uploadPath, fileName), data)

  return `avatars/${fileName}`
}
