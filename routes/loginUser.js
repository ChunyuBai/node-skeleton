const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const generateRandomString = require('../helper_functions/randomString');

router.get('/', (req, res) => {
  res.render('login');
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

    // Creates a cookie
    const user = result.rows[0];
    req.session.userID = user.id;

      if (!user || user && user.password !== password) {
        res.send('Error!');
      }
    res.redirect('/');
    return user;
  })
});

module.exports = router;
