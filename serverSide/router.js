const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const session = require('express-session');
const users = require('./models/model.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.use(bodyParser.json());
router.use(session({secret: 'keyboard cat'}));

router.post('/register',(req,res)=>{
  console.log(req.body.data);
  const name = req.body.data.name;
  const password = req.body.data.password;
  const email = req.body.data.email;



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

module.exports = router
