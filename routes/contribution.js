const express = require('express');
const router  = express.Router();
const db = require('../db/connection')

router.post('/', (req, res) => {

  // console.log('reqParam:', req.param);
  // console.log('req:', req);

  const content = req.body.contribution;
  const author_id = req.session.userID;
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

router.post('/:id/upvote', (req,res) => {

  let id = req.params.id;
  const action = req.query.action;
  let dbquery;

  if (action === 'upvote') {
    dbquery = db.query(`UPDATE contributions
    SET upvotes = upvotes + 1
    WHERE id = $1;`,
    [id])
  } else if (action === 'downvote') {
    dbquery = db.query(`UPDATE contributions
    SET upvotes = upvotes - 1
    WHERE id = $1;`,
    [id])
  }
  dbquery.then(()=>{
    res.send({'message': 'contribution changed'})
  })
});

router.post('/:id/add',(req,res) => {
  let id = Number(req.params.id);
  let content = String(req.body.contribution);
  console.log("content =====> ",content, id)
  console.log('req body =====>',req.body)
  db.query(`UPDATE stories
   SET content = CONCAT(content, $1::text)
   WHERE id = $2; `,
   [content,id])
   .then(()=> {
    db.query(`DELETE FROM contributions
    WHERE story_id = $1;`,
    [id])
   })
   .then(() => {
    res.send('story changed');
   })

})

module.exports = router;
