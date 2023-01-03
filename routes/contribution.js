const express = require('express');
const router  = express.Router();

router.post('/story_contribution', (req, res) => {
  console.log('story contribution:', req.body.contribution);
});

module.exports = router;
