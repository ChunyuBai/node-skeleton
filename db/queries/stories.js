const db = require('../connection');

const getStoryWithId = (id) => {
  return db
    .query(`SELECT *
            FROM stories
            WHERE id = $1;`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getStoryWithId };
