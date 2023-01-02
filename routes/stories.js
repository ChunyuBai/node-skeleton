const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const database = require('../public/scripts/database');

router.get('/stories', (req, res) => {
  const templateVars = { greeting: "Story Name Placeholder" };
  console.log(database.getStoryWithId(1));
  res.render('stories', templateVars);
});

module.exports = router;
