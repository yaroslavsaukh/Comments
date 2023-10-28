import { Sequelize, DataTypes } from 'sequelize'

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

const Comments = sequelize.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // authorId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
})

User.hasMany(Comments, { onDelete: 'CASCADE', as: 'author' })
Comments.belongsTo(User)

await sequelize.sync()
export { Comments, User }
