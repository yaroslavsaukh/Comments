import { Sequelize } from 'sequelize'

let sequelize
try {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite3',
    logging: false,
  })
  console.log('Database was successfully connected.')
} catch (e) {
  console.error(e)
}
export default sequelize
