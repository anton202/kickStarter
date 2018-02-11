const db = require('../db.js');
const sequelize = require('sequelize');
const projects = db.define('projects',{
img: sequelize.TEXT,
title: sequelize.STRING,
category: sequelize.STRING,
fundingDurataion: sequelize.INTEGER,
description: sequelize.TEXT,
userId: sequelize.INTEGER,
fundingGoal: sequelize.INTEGER,

backers: sequelize.INTEGER
})

module.exports = projects;
