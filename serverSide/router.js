const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const session = require('express-session');
const users = require('./models/model.js');
const projects = require('./models/model2.js')
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.use(bodyParser.json());
router.use(session({secret:'keyboard cat'}));

router.post('/register',(req,res)=>{
  console.log(req.body.data);
  const name = req.body.data.name;
  const password = req.body.data.password;
  const email = req.body.data.email;

  users.findAll({where: {email}}).then(data=>{
    console.log(data.map((d)=>d.toJSON()));
    if(data.length !== 0) return res.json("email already exist")

    bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      users.create({
          name,
          password: hashedPassword,
          email
        })
        .then(() => {
          res.json("accout created");
          console.log('userCreated');
        })
      })
    })
  })
})


router.post('/login',(req,res)=>{
  console.log(req.body);
  const email = req.body.data.email;
  const password = req.body.data.password;

  users.findAll({where:{email}}).then(async data=>{
    let info = await data.map((d)=>d.toJSON());
    console.log(info)
    if(info.length === 0) return res.json("email dose not exist in dataBase");
    bcrypt.compare(password, info[0].password, (err, isValid) => {
      if (isValid === true) {
        req.session.userId = info[0].id;
        console.log(req.session);
        return res.json({"message":"secsesfuly loged in",
      "status":true})
      };
      res.json({"message":"wrong password",
                "status":false,
      })
    })
  })
})


router.post('/startProject',(req,res)=>{
  console.log(req.body.data)
  const {Category,foalaEditor,fundingDurataion,img,title} = req.body.data;
  projects.create({img,title,category:Category,description:foalaEditor,fundingDurataion,userId:req.session.userId}).then(()=>console.log('project created'));
  res.json("proj created secesfuly");
})

module.exports = router
