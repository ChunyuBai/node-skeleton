const express = require('express');
const router  = express.Router();
const storyQuery = require('../db/queries/stories');
const contributionsQuery = require('../db/queries/contributions');
const userByIdQuery = require('../db/queries/userById');



router.get('/stories/:id', (req, res) => {
  const specificUser = req.session.userID;
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
        status: storyData.is_complete,
        contributions: contributionData,
        user: specificUser
      };

      console.log('tVars story:', templateVars.status);
      res.render('stories', templateVars);
    });
  });
});

module.exports = router;
