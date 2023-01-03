const express = require('express');
const router  = express.Router();
const database = require('../db/queries/stories');

router.get('/stories/:id', (req, res) => {
  const id = req.params.id;
  const dbEntry = database.getStoryWithId(id);

  // On resolved promise
  dbEntry.then(data => {
    const templateVars = {
      title: data.name,
      id: data.id,
      content: data.content
    };

    console.log('tVars:', templateVars);
    res.render('stories', templateVars);
  });

});

module.exports = router;
