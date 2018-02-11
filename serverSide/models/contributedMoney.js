const db = require('../db.js');
const sequelize = require('sequelize');
const money = db.define('contributedMoneys',{
amount: sequelize.INTEGER,
userId: sequelize.INTEGER,
projId: sequelize.INTEGER,
})

module.exports = money;
