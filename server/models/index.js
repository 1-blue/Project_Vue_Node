const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user.js');
const Room = require('./room.js');
const Chatting = require('./chatting.js');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Room = Room;
db.Chatting = Chatting;

db.User.init(db.sequelize);
db.Room.init(db.sequelize);
db.Chatting.init(db.sequelize);

db.User.associate(db);
db.Room.associate(db);
db.Chatting.associate(db);

module.exports = db;