const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Store = require('../app/models/Store');
const Product = require('../app/models/Product');
const Type = require('../app/models/Type');

const connection = new Sequelize(dbConfig);

User.init(connection);

Type.init(connection);

Store.init(connection);
Store.associate(connection.models);

Product.init(connection);
Product.associate(connection.models);

module.exports = connection;
