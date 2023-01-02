const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.post('/story_contribution', (req, res) => {
  console.log('story contribution:', req.body.contribution);
});

module.exports = router;
