const express = require('express')
const router = express.Router()
const users = require('../models/user.js');
const projects = require('../models/projects.js')
const contributedMoney = require('../models/contributedMoney.js');


router.get('/viewAll/:id',(req,res)=>{
  let category = req.params.id;
  projects.findAll({where:{category} ,include:[{model:contributedMoney}]}).then(allProjects=>{
    let data = allProjects.map(d=>d.toJSON());

     data.map((c)=>{
      let totalMoney = 0;
      let backers = new Set();
        c.contributedMoneys.map((c)=>{
         backers.add(c.userId);
         totalMoney += c.amount;
       })
       c.backers = backers.size;
       c.totalMoney = totalMoney;
     })
    res.json(data);
  });
})


router.get('/viewProject/:id',(req,res)=>{
  const projectId = req.params.id;

  projects.findOne({where:{id:projectId},include:[{model:contributedMoney}]})
  .then((project)=>{
    project = project.toJSON();

    project.totalAmountContributed = project.contributedMoneys
    .reduce((sum,contributer)=>{
      return sum + contributer.amount
    },0);

    const backers = new Set();
    project.contributedMoneys.forEach((backer)=>backers.add(backer.userId));
    project.totalBackers = backers.size;

    res.json(project);
  });

})


/*const project = await projects.findOne({where:{id}});
const contributers = await contributedMoney.findAll({where:{projectId:id}})

if(contributers.length === 0)
  return res.json({projectData: project});

const totalContributedAmount = await contributers.reduce((sum,contributer)=>sum + contributer.amount,0);

let backers = new Set();
contributers.forEach(contributer => backers.add(contributers.userId));
const buckersSize = backers.size;
return res.json({projectData: project, buckers: buckersSize});*/

router.get('/preview/:id',(req,res)=>{
   let category = req.params.id;
   projects.findAll({where:{category}}).then( async data=>{
   let arr = data.map(d=>d.toJSON());

   if(arr.length === 3 || arr.length < 3 || arr.length === 0) return res.json(arr)
   if(arr.length > 3){
     let set = new Set();
     let nArr = [];
     function randomNum(){
       if(set.size === 3) return set ;
       set.add(Math.floor(Math.random()*arr.length));
       randomNum();
     }
    randomNum();
    for(let value of set) nArr.push(arr[value]);
    for(let val of nArr){
       await contributedMoney.findAll({where:{projectId:val.id}}).then(async data=>{
        val.contributedMoney = data.reduce((a,c)=>a+c.amount,0);
        let backers = new Set();
        await data.map(x=>backers.add(x.userId));
        val.backers = backers.size;
      })
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
