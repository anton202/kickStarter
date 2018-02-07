const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const session = require('express-session');
const users = require('./models/model.js');
const projects = require('./models/model2.js')
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.use(bodyParser({limit: '50mb'}));
router.use(session({secret:'keyboard cat'}));

router.post('/api/register',(req,res)=>{

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


router.post('/api/login',(req,res)=>{

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


  router.post('/api/startProject',(req,res)=>{

  const {Category,foalaEditor,fundingDurataion,img,title,fundingGoal} = req.body.data;
  projects.create({img,title,category:Category,description:foalaEditor,fundingDurataion,userId:req.session.userId,fundingGoal}).then(()=>console.log('project created'));
  res.json("proj created secesfuly");
})


router.get('/api/viewAll/:id',(req,res)=>{

  let category = req.params.id;
  projects.findAll({where:{category}}).then(data=>{res.json(data);console.log(data)})
})


router.get('/api/viewProject/:id',(req,res)=>{
  let id = req.params.id;
  projects.findAll({where:{id}}).then(data=>{res.json(data);console.log(data)})
})


router.get('/api/preview/:id',(req,res)=>{
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


router.get('/api',async (req,res)=>{
  let stats = {};
  await users.findAll().then(data=>stats.totalUsers = data.length);
  await projects.findAll().then(data=>{
    stats.totalProjects = data.length
    let info = data.map(d=>d.toJSON());
    let totalMoney = []
    info.map(obj=>{
      if(obj.contributedMoney !== null)
      totalMoney.push(obj.contributedMoney)
    });
    stats.totalMoney = totalMoney.reduce((a,c)=>a+c);
  });
  res.json(stats);
})


router.put('/api/contribute',(req,res)=>{
  const contr = +req.body.data;
  const projId = +req.body.id
  projects.findOne({where:{id:projId}}).then(data=>{
  data.update({contributedMoney: data.contributedMoney + contr,backers: data.backers +1}).then(()=>{res.json("Thank you")})

  })
})


router.get('/api/userArea',(req,res)=>{
  projects.findAll({where:{userId:req.session.userId}}).then(data=>{
    let info = data.map(d=>d.toJSON());
    console.log(info);
    res.json(info)});
})


router.delete('/api/deletProject/:id',(req,res)=>{
  let projId = req.params.id;
  projects.findOne({where:{id:projId}}).then(data=>{
    data.destroy();
    res.json(true);
  })
})

module.exports = router
