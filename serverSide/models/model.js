const db = require('../db.js');
const sequelize = require('sequelize');
const users = db.define('users',{
name: sequelize.STRING,
password: sequelize.TEXT,
email: sequelize.TEXT
})

module.exports = users;
