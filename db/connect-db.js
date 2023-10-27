import { Sequelize } from 'sequelize'

export const connectDB = async () => {
  try {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'db.sqlite3',
    })
    console.log('Database was successfully connected.')
    return sequelize
  } catch (error) {
    console.error(error)
  }
}
