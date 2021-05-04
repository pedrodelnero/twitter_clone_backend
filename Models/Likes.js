import Sequelize from 'sequelize';

import db from '../db/db.js';

const { DataTypes } = Sequelize;

const Like = db.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Like.sync();
// Like.sync({ force: true });

export default Like;
