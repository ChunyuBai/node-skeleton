const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const database = require('../db/queries/stories');

router.get('/stories/:id', (req, res) => {
  const id = req.params.id;
  const dbEntry = database.getStoryWithId(id);

  const templateVars = {
    greeting: "Story Name Placeholder",
    id: id,
    content: dbEntry
  };
  console.log(templateVars);
  res.render('stories', templateVars);
});

module.exports = router;
