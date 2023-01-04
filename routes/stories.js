const express = require('express');
const router  = express.Router();
const storyQuery = require('../db/queries/stories');
const contributionsQuery = require('../db/queries/contributions');
const db = require('../db/connection');
const userByIdQuery = require('../db/queries/userById');

router.get('/', (req, res) => {
  db
  .query(`SELECT *
  FROM stories;
  `)
  .then(result => res.send(result.rows));
})

router.get('/:id', (req, res) => {

  const id = req.params.id;
  const story = storyQuery.getStoryWithId(id);
  const contributions = contributionsQuery.getContributionsWithStoryId(id);
  const status = false; // This is hard coded to always show false, must equal to the story status being done/in progress
  const user = db
  .query(`SELECT *
  FROM users
  WHERE id = $1
  LIMIT 1;
  `, [req.session.userID])
  .then(result => result.rows[0]);


  const listOfInfo = [story, contributions, user];

  // On resolved promise
  Promise.all(listOfInfo).then(info => {
    const storyData = info[0];
    const contributionData = info[1];
    const userData = info[2];

    const templateVars = {
      title: storyData.name,
      id: storyData.id,
      content: storyData.content,
      contributions: contributionData,
      user: userData,
      status: status
    };
    res.render('stories', templateVars);
  })
});


module.exports = router;
