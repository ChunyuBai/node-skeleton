const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  //console.log('body ====', req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  return db
  .query(`INSERT INTO users(name, email, password)
  VALUES ($1,$2,$3)
  RETURNING *;`,
  [username, email, password])
  .then(result => {
    res.redirect('/');
    return result.rows[0];
  })
});

module.exports = router;
