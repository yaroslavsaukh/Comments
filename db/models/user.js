import sequelize from '../connect-db.js'
import { DataTypes } from 'sequelize'
import Comments from './comment.js'

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

User.hasMany(Comments, { onDelete: 'CASCADE', as: 'author' })
Comments.belongsTo(User)
try {
  await sequelize.sync()
  console.log('User model synced')
} catch (e) {
  console.log(e)
}

export default User
