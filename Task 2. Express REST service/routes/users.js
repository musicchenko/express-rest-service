const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {undef} = require('../modules/undef');
const {Task} = require('./tasks');
let User = [];

router.get('/users', (req, res) => {
  let usersList = [];
  for(let i = 0; i < User.length; i++) {
    let user = {
      id: User[i].id,
      name: User[i].name,
      login: User[i].login
    };
    usersList.push(user);
  }
  console.log('All users data get');
  res.send(usersList);
});

router.get('/users/:id', (req, res) => {
  let user = {};
  for(let i = 0; i < User.length; i++) {
    if(User[i].id === req.params.id) {
      user = {
        id: User[i].id,
        name: User[i].name,
        login: User[i].login
      };
      break;
    }
  }
  console.log(`User ${req.params.id} data get`);
  res.send(user);
});

router.post('/users', (req, res) => {
  let userId = uuidv4();
  let userName = typeof req.query.name !== "undefined" ? req.query.name : undef("Name");
  let userLogin = typeof req.query.login !== "undefined" ? req.query.login : undef("Login");
  let userPassword = typeof req.query.password !== "undefined" ? req.query.password : undef("Password");
  let newUser = {
    id: userId,
    name: userName,
    login: userLogin,
    password: userPassword
  };
  User.push(newUser);
  console.log('User created');
  res.status(201).send(newUser);
});

router.put('/users/:id', (req, res) => {
  let user = {};
  for(let i = 0; i < User.length; i++) {
    if(User[i].id === req.params.id) {
      User[i].name = typeof req.query.name !== "undefined" ? req.query.name : User[i].name;
      User[i].login = typeof req.query.login !== "undefined" ? req.query.login : User[i].login;
      User[i].password = typeof req.query.password !== "undefined" ? req.query.password : User[i].password;
      user = User[i];
      console.log(`User ${req.params.id} was changed`);
      break;
    }
  }
  res.send(user);
});

router.delete('/users/:id', (req, res) => {
  let userExists = false;
  for(let i = 0; i < User.length; i++) {
    if(User[i].id === req.params.id) {
      userExists = true;
      User.splice(i, 1);
      clearTaskByUserId(req.params.id);
      console.log(`User ${req.params.id} was deleted`);
      break;
    }
  }
  res.sendStatus(userExists ? 200 : 204);
});

function clearTaskByUserId(userId) {
  for(let i = 0; i < Task.length; i++) {
    if(Task[i].userId === userId) {
      Task[i].userId = null;
    }
  }
}

module.exports = router;
module.exports.User = User;
