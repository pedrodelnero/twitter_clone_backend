import Sequelize from 'sequelize';

import db from '../db/db.js';

const { DataTypes } = Sequelize;

const UserFollower = db.define('UserFollower', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserFollower.sync();
// UserFollower.sync({ force: true });

export default UserFollower;
