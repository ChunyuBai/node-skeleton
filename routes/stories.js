const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const database = require('../db/queries/stories');

router.get('/stories', (req, res) => {
  const id = req.params.id;
  const templateVars = { greeting: "Story Name Placeholder" };
  console.log(database.getStoryWithId(id));
  res.render('stories', templateVars);
});

module.exports = router;
