const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const generateRandomString = require('../helper_functions/randomString');

router.get('/', (req, res) => {
  res.render('login', {user: null});
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  return db
  .query(`SELECT *
  FROM users
  WHERE email = $1
  AND password = $2
  LIMIT 1;
  `, [email, password])
  .then(result => {

    const user = result.rows[0];

    if (user === undefined || user && user.password !== password) {
      res.send('Error!');
    } else {
        req.session.userID = user.id;
        res.redirect('/');
        return user;
      }
  })
});

module.exports = router;
