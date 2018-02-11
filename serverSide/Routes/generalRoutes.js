const express = require('express')
const router = express.Router()
const users = require('../models/model.js');
const bodyParser = require('body-parser');
const projects = require('../models/model2.js')
const contributedMoney = require('../models/contributedMoney.js');

  router.use(bodyParser({limit: '50mb'}));

  router.post('/startProject',(req,res)=>{
  const {Category,foalaEditor,fundingDurataion,img,title,fundingGoal} = req.body.data;
  projects.create({img,title,category:Category,description:foalaEditor,fundingDurataion,userId:req.session.userId,fundingGoal}).then(()=>console.log('project created'));
  res.json("proj created secesfuly");
})


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


router.put('/contribute',(req,res)=>{
  const contr = +req.body.data;
  const projId = +req.body.id
  contributedMoney.create({amount:contr,projId,userId:req.session.userId}).then(()=>res.json('Thank you'));
  })


router.delete('/deletProject/:id',(req,res)=>{
  let projId = req.params.id;
  projects.findOne({where:{id:projId}}).then(data=>{
    data.destroy();
    res.json(true);
  })
})

module.exports = router
