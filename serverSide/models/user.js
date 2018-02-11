const db = require('../db.js');
const contributedMoney = require('./contributedMoney.js');
const projects = require('./projects.js');
const sequelize = require('sequelize');
const users = db.define('users',{
name: sequelize.STRING,
password: sequelize.TEXT,
email: sequelize.TEXT
})

users.hasMany(contributedMoney);
users.hasMany(projects);

module.exports = users;
