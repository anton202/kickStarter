const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const session = require('express-session');
const users = require('../models/model.js');
const projects = require('../models/model2.js')
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.use(bodyParser({limit: '50mb'}));
router.use(session({secret:'keyboard cat'}));

router.post('/register',(req,res)=>{

  const name = req.body.data.name;
  const password = req.body.data.password;
  const email = req.body.data.email;

    users.findAll({where: {email}}).then(data=>{

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

        })
      })
    })
  })
})


router.post('/login',(req,res)=>{

  const email = req.body.data.email;
  const password = req.body.data.password;

    users.findAll({where:{email}}).then(async data=>{
    let info = await data.map((d)=>d.toJSON());

    if(info.length === 0) return res.json("email dose not exist in dataBase");
    bcrypt.compare(password, info[0].password, (err, isValid) => {
      if (isValid === true) {
        req.session.userId = info[0].id;

        return res.json({"message":"secsesfuly loged in",
                        "status":true,
                        "userName":info[0].name,
                        "userId":info[0].id
                        })
      };
      res.json({"message":"wrong password",
                "status":false,
      })
    })
  })
})


router.get('/userArea',(req,res)=>{
  projects.findAll({where:{userId:req.session.userId}}).then(data=>{
    let info = data.map(d=>d.toJSON());
    console.log(info);
    res.json(info)});
})

module.exports = router;
