const express = require('express');
const router  = express.Router();
const db = require('../db/connection')

router.get('/',(req,res) => {
  res.render('create_story');//use create_story as templete
});

router.post('/',(req,res) => {
  // console.log('body =>',req.body) for check what is my body
    let storyName = req.body.name;
    let content = req.body.content;
    //use our database
    return db
    .query(`INSERT INTO stories(name, content)
    VALUES($1,$2)
    RETURNING *;`,
    [storyName,content])// $1 = storyName $2 = content
    .then(result => {
      let id = result.rows[0].id;
      return res.json(id);// only return json format to front end
    })
});
module.exports = router;
