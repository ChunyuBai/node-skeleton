const db = require('../connection');

const getContributionsWithStoryId = (id) => {
  return db
    .query(`SELECT *
            FROM contributions
            WHERE story_id = $1;`, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getContributorNameWithId = (id) => {
  return db
    .query(`SELECT * users.name
            FROM contributions
            JOIN users ON author_id = users.id
            WHERE author_id = $1;`, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getContributionsWithStoryId, getContributorNameWithId };
