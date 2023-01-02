const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getStoryWithId = (id) => {
  return pool
    .query(`SELECT id, name, content
            FROM stories
            WHERE id = $1;`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getStoryWithId = getStoryWithId;
