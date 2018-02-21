const express = require('express')
const router = express.Router()
const users = require('../models/user.js');
const projects = require('../models/projects.js')
const contributedMoney = require('../models/contributedMoney.js');
const logic = require('../logic.js');
const Sequelize = require('sequelize');


router.get('/viewAll/:id',(req,res)=>{
const category = req.params.id;

projects.findAll({where:{category},include:[{model:contributedMoney}]})
 .then(projects => {
    projects = projects.map(project => project.toJSON());

    projects.forEach(project =>{
        project.totalAmountContributed = logic.totalAmountContributed(project);
        project.backers = logic.totalbackers(project);
      })
      res.json(projects);
  })
})


router.get('/viewProject/:id',(req,res)=>{
  const projectId = req.params.id;

  projects.findOne({where:{id:projectId},include:[{model:contributedMoney}]})
  .then((project)=>{
    project = project.toJSON();

    project.totalAmountContributed = logic.totalAmountContributed(project);
    project.backers = logic.totalbackers(project);

    res.json(project);
  });

})


router.get('/preview/:id',(req,res)=>{
   const category = req.params.id;
   projects.findAll({where:{category},
     include:[{model:contributedMoney}],
     order:[ Sequelize.fn( 'RAND' )],
     limit:3})
     .then(projects =>{
       projects = projects.map(project => project.toJSON());

       projects.forEach(project =>{
         project.totalAmountContributed = logic.totalAmountContributed(project);
         project.backers = logic.totalbackers(project);
        })
       res.json(projects);
     })
})


router.get('/stats',async (req,res)=>{
  const stats = {};
  stats.totalUsers = await users.count();
  stats.totalProjects = await projects.count();
  stats.totalAmountContributed = await contributedMoney.sum('amount');
  res.json(stats);
})

module.exports = router
