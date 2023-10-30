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

export default Comments
