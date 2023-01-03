const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const generateRandomString = require('../helper_functions/randomString.js');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  if (username === '' || email === '' || password === '') {
    res.send('Invalid parameters!');
    return;
  }

  return db
  .query(`INSERT INTO users(name, email, password)
  VALUES ($1,$2,$3)
  RETURNING *;`,
  [username, email, password])
  .then(result => {

    // Creates a cookie
    const user = result.rows[0];
    req.session.userID = user.id;

    res.redirect('/');
    return user;
  })
});

module.exports = router;
