const express = require('express');
const router  = express.Router();
const storyQuery = require('../db/queries/stories');
const contributionsQuery = require('../db/queries/contributions');
const db = require('../db/connection');

router.get('/stories/:id', (req, res) => {
  const id = req.params.id;
  const story = storyQuery.getStoryWithId(id);
  const contributions = contributionsQuery.getContributionsWithStoryId(id);

  // On resolved promise
  story.then(storyData => {
    contributions.then(contributionData => {

      const templateVars = {
        title: storyData.name,
        id: storyData.id,
        content: storyData.content,
        contributions: contributionData
      };

      // console.log('tVars:', templateVars);
      res.render('stories', templateVars);
    });
  });
});

router.post('/stories/:id', (req,res) => {
 let upvoteNum = Number(req.body.upvoteNum);
 let id = req.params.id;
 return db
 .query(`UPDATE contributions
 SET upvotes = $1
 WHERE id = $2`,
 [upvoteNum,id]);
})

module.exports = router;
