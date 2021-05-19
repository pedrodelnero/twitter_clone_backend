export { default as User } from './Users.js';
export { default as Post } from './Posts.js';
export { default as Like } from './Likes.js';
export { default as UserFollower } from './UserFollower.js';
// import fs from 'fs';
// import path from 'path';
// import Sequelize from 'sequelize';
// import basename from path.basename(__filename);
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// const sequelize = new Sequelize('TwitterCloneDB', 'root', process.env.DB_PW, {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
//   logging: false,
//   timezone: '+04:00',
// });
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log(import.meta.url);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== path.basename(__filename) &&
//       file.slice(-3) === '.js'
//       //   file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;
