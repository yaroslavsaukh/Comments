import sequelize from '../connect-db.js'
import { DataTypes } from 'sequelize'

const Comments = sequelize.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
})
try {
  await sequelize.sync()
  console.log('Comments model synced')
} catch (e) {
  console.log(e)
}

export default Comments
