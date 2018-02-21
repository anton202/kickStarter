const express = require('express')
const router = express.Router()
const users = require('../models/user.js');
const projects = require('../models/projects.js')
const contributedMoney = require('../models/contributedMoney.js');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/register',(req,res)=>{

  const name = req.body.data.name;
  const password = req.body.data.password;
  const email = req.body.data.email;

    users.findAll({where: {email}})
    .then(user=>{
    if(user.length !== 0)
    return res.json("email already exist")

    bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hashedPassword) => {
    users.create({
          name,
          password: hashedPassword,
          email
        })
        .then(() => {
          res.json("accout created");
        })
      })
    })
  })
})


router.post('/login',(req,res)=>{

  const email = req.body.data.email;
  const password = req.body.data.password;

    users.findOne({where:{email}})
    .then( user =>{
      user = user.toJSON();
console.log(user,password)
    if(user.length === 0)
    return res.json("email dose not exist in dataBase");

    bcrypt.compare(password, user.password, (err, isValid) => {
      if (isValid === true) {
        req.session.userId = user.id;
        req.session.user = user;

        return res.json({"message":"secsesfuly loged in",
                        "status":true,
                        "userName":user.name,
                        "userId":user.id
                        })
      };
      res.json({"message":"wrong password",
                "status":false,
      })
    })
  })
})


router.get('/isLoged',(req,res)=>{
  res.json(req.session.user? {session:req.session.user,status:true}: false);
})

router.get('/logOut',(req,res)=>{
  req.session.user = "";
  req.session.userId = "";
  res.sendStatus(204);
})

router.get('/userArea',(req,res)=>{
  projects.findAll({where:{userId:req.session.userId}}).then(projects=>{
  res.json(projects)
})
})
/*  let info = data.map(d=>d.toJSON());
  console.log(info);
  res.json(info)});*/


router.post('/startProject',(req,res)=>{
const {Category,foalaEditor,fundingDurataion,img,title,fundingGoal} = req.body.data;
projects.create({img,title,category:Category,description:foalaEditor,fundingDurataion,userId:req.session.userId,fundingGoal})
.then(()=> res.json("proj created secesfuly")).catch((err)=>res.json("somthing went wrong.make shure that the img your'e trying to uplod is under the limit mentiond above"));
})


router.put('/contribute',(req,res)=>{
  const contr = +req.body.data;
  const projectId = +req.body.id
  contributedMoney.create({amount:contr,projectId,userId:req.session.userId}).then(()=>res.json('Thank you'));
  })


  router.delete('/deletProject/:id',(req,res)=>{
    let projId = req.params.id;
    projects.findOne({where:{id:projId}}).then(data=>{
      data.destroy();
      res.json(true);
    })
  })

module.exports = router;
