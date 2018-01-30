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
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      user.create({
          name,
          password: hashedPassword,
          email
        })
        .then(() => {
          res.end();
          console.log('userCreated');
        })
    })
  })
})

module.exports = router
