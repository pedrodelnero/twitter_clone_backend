import Sequelize from 'sequelize';

import db from '../db/db.js';

const { DataTypes } = Sequelize;

const Post = db.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING(45),
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Post.sync({ force: true });

export default Post;
