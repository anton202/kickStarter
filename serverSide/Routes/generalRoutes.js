const express = require('express')
const router = express.Router()
const users = require('../models/user.js');
const bodyParser = require('body-parser');
const projects = require('../models/projects.js')
const contributedMoney = require('../models/contributedMoney.js');

  router.use(bodyParser({limit: '50mb'}));


router.get('/viewAll/:id',(req,res)=>{
  let category = req.params.id;
  projects.findAll({where:{category}}).then(data=>{res.json(data);})
})


router.get('/viewProject/:id',async (req,res)=>{
  let id = req.params.id;
  let obj = {
    contributedMoney:0,
    backers:0
  };
  await projects.findOne({where:{id}}).then(data=>obj.projectData = data);
  await contributedMoney.findAll({where:{projId:id}}).then(async data=>{
    if(data.length === 0)
    return res.json(obj);

    let totalMoney = await data.reduce((a,c)=>a+c.amount,0);
    obj.contributedMoney = totalMoney;
    obj.backers = data.length;
    return res.json(obj);
  })
})


router.get('/preview/:id',(req,res)=>{
  let category = req.params.id;
  projects.findAll({where:{category}}).then( data=>{
   let arr = data.map(d=>d.toJSON());
   if(arr.length === 3 || arr.length < 3 || arr.length === 0) return res.json(arr)
   if(arr.length > 3){
     let numArr = [];
     let nArr = [];
     for (var i = 0; 3 > numArr.length; i++) {
       let random = Math.floor(Math.random()*arr.length);
       if(numArr.indexOf(random) === -1){
         numArr.push(random);
       }
     }
     for (var i = 0; i < 3; i++) {
       nArr.push(arr[numArr[i]]);
     }
     res.json(nArr);
   }
  })
})


router.get('/stats',async (req,res)=>{
  let stats = {};
  await users.findAll().then(data=>stats.totalUsers = data.length);
  await projects.findAll().then(data=>{stats.totalProjects = data.length});
  await contributedMoney.findAll().then(async data=>{
    if(data.length ===0)
    return stats.totalMoney = 0;

    totalMoney = data.map(d=>d.toJSON());
    stats.totalMoney =  totalMoney.reduce((a,c)=>a+c.amount,0);
  })
  res.json(stats);
})


module.exports = router
