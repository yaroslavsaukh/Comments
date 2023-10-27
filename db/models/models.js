import { Sequelize, DataTypes } from 'sequelize'
import generate_id from '../utils/generate-id.js'

const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'db.sqlite3' })

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

const comments = sequelize.define('Comment', {
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_comment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
})

// Устанавливаем самоссылочное отношение "hasMany" для модели Comment
comments.hasMany(comments, {
  as: 'replies',
  foreignKey: 'parent_comment_id',
  onDelete: 'cascade',
})

User.hasMany(comments, { as: 'comments', foreignKey: 'author_id' })
// comments.belongsTo(User, { foreignKey: 'author_id' })

await sequelize.sync()
export { comments, User, sequelize }
