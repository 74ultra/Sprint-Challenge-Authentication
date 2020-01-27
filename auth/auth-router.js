const router = require('express').Router();
const Auth = require('./auth-model.js');
const bcrypt = require('bcryptjs');

const Token = require('./token');

router.get('/', (req, res) => {
  Auth.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'There was an error retrieving users'})
    })
})

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  Auth.insert({ username, password: bcrypt.hashSync(password, 10) })
    .then(id => {
      res.status(201).json({ message: `User ${username} registered`, id })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'There was an registering the user'})
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Auth.findByUserName(username)
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        console.log('Success', bcrypt.compareSync(password, user.password))
        const token = Token.generate(user)
        res.status(200).json({
          message: `Welcome, ${username}`,
          token
        })
      } else {
        console.log('Failure', bcrypt.compareSync(password, user.password))
        res.status(401).json({ message: 'Invalid credentials' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error logging in'})
  })
});

module.exports = router;
