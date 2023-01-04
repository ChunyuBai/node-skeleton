const express = require('express');
const router  = express.Router();
const db = require('../db/connection')

router.post('/story_contribution', (req, res) => {

  // console.log('reqParam:', req.param);
  // console.log('req:', req);

  const content = req.body.contribution;
  const author_id = 1; // should be able to get this from cookie data (req.session.user_id)
  const story_id = req.body.story_id;

  // console.log('story contribution:', content);
  // console.log('story id:', story_id);

  return db
    .query(`INSERT INTO contributions(story_id, author_id, content)
            VALUES($1, $2, $3)
            RETURNING *;`,
    [story_id, author_id, content])
    .then(result => {
      res.redirect(`/stories/${story_id}`);
    })
});

module.exports = router;
