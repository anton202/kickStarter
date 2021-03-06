const express = require("express");
const router = express.Router();
const users = require("../models/user.js");
const projects = require("../models/projects.js");
const contributedMoney = require("../models/contributedMoney.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/register", (req, res) => {
  const name = req.body.data.name;
  const password = req.body.data.password;
  const email = req.body.data.email;

  users.findAll({ where: { email } }).then(user => {
    if (user.length !== 0) return res.sendStatus(409);

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        users
          .create({
            name,
            password: hashedPassword,
            email
          })
          .then(() => {
            res.sendStatus(201);
          });
      });
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.data.email;
  const password = req.body.data.password;

  users.findOne({ where: { email } }).then(user => {
    if (!user) {
      return res.json({ message: "email dose not exist in dataBase" });
    }
    user = user.toJSON();
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (isValid === true) {
        req.session.userId = user.id;
        req.session.user = user;

        return res.json({
          message: "successfully logged in",
          status: true,
          userName: user.name,
          userId: user.id
        });
      }
      res.json({
        message: "wrong password",
        status: false
      });
    });
  });
});

router.get("/isLoged", (req, res) => {
  res.json(
    req.session.user ? { session: req.session.user, status: true } : false
  );
});

router.get("/logOut", (req, res) => {
  req.session.user = "";
  req.session.userId = "";
  res.sendStatus(204);
});

router.get("/userArea", (req, res) => {
  projects.findAll({ where: { userId: req.session.userId } }).then(projects => {
    res.json(projects);
  });
});

router.post("/startProject", (req, res) => {
  const {
    Category,
    foalaEditor,
    fundingDurataion,
    img,
    title,
    fundingGoal
  } = req.body.data;
  projects
    .create({
      img,
      title,
      category: Category,
      description: foalaEditor,
      fundingDurataion,
      userId: req.session.userId,
      fundingGoal
    })
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(409));
});

router.put("/contribute", (req, res) => {
  const amountContributed = +req.body.data;
  const projectId = +req.body.id;
  contributedMoney
    .create({
      amount: amountContributed,
      projectId,
      userId: req.session.userId
    })
    .then(() => res.sendStatus(200));
});

router.delete("/deleteProject/:id", (req, res) => {
  let projId = req.params.id;
  projects.findOne({ where: { id: projId } }).then(data => {
    data.destroy();
    res.sendStatus(200);
  });
});

module.exports = router;
