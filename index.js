import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import fileUpload from 'express-fileupload'
import errorHandler from './mv/error-handler.js'
import apiRouter from './routes/index.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

if (!fs.existsSync('public')) fs.mkdirSync('public')

app.use(express.json())
app.use(express.static('public'))
app.use(fileUpload({}))

app.use('/api', apiRouter)
app.use(errorHandler)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// syncDB()

try {
  app.listen(PORT, () => console.log('Server started on port ' + PORT))
} catch (e) {
  console.log(e)
}
