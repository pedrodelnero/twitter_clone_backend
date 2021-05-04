import Sequelize from 'sequelize';

import db from '../db/db.js';
import Post from './Posts.js';

const { DataTypes } = Sequelize;

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(45),
  },
  handle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

// User.hasMany(Post);
User.sync();
// User.sync({ force: true });

export default User;
