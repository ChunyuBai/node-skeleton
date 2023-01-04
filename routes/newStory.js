const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/',(req,res) => {
  db
  .query(`SELECT *
  FROM users
  WHERE id = $1
  LIMIT 1;
  `, [req.session.userID])
  .then(result => {
    console.log('authod id===',req.session.userID)
    res.render('create_story', {user: result.rows[0]});
  })//use create_story as templete
});

router.post('/',(req,res) => {
  // console.log('body =>',req.body) for check what is my body
    let storyName = req.body.name;
    let content = req.body.content;
    let author_id = req.session.userID;
    console.log('req.body=====>'.author_id)
    //use our database
    return db
    .query(`INSERT INTO stories(name, content, author_id)
    VALUES($1,$2,$3)
    RETURNING *;`,
    [storyName,content,author_id])// $1 = storyName $2 = content
    .then(result => {
      let id = result.rows[0].id;
      return res.json(id);// only return json format to front end
    })


});
module.exports = router;
