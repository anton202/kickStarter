const db = require('../db.js');
const sequelize = require('sequelize');
const contributedMoney = require('./contributedMoney.js');

const projects = db.define('projects',{
img: sequelize.TEXT,
title: sequelize.STRING,
category: sequelize.STRING,
fundingDurataion: sequelize.INTEGER,
description: sequelize.TEXT,
userId: sequelize.INTEGER,
fundingGoal: sequelize.INTEGER,
})
projects.hasMany(contributedMoney);
module.exports = projects;
