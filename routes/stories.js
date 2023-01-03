const express = require('express');
const router  = express.Router();
const storyQuery = require('../db/queries/stories');
const contributionsQuery = require('../db/queries/contributions');

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

      console.log('tVars:', templateVars);
      res.render('stories', templateVars);
    });
  });
});

module.exports = router;
