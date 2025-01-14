// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const db = require('./db/connection');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  secret: 'blue-lobster-jumpscare',
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const newUser = require('./routes/new-user');
const newStory = require('./routes/newStory');
const storyRoutes = require('./routes/stories');
const contributionRoutes = require('./routes/contribution');
const loginUser = require('./routes/loginUser');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/register', newUser);
app.use('/new',newStory);

app.use('/stories', storyRoutes);
app.use('/story_contribution', contributionRoutes);
app.use('/complete', storyRoutes);
app.use('/login', loginUser);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// Home Page
app.get('/', (req, res) => {
  db
  .query(`SELECT *
  FROM users
  WHERE id = $1
  LIMIT 1;
  `, [req.session.userID])
  .then(result => {
    res.render('index', {user: result.rows[0]});
  })
});

// Logout
app.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.render("index", {user: null});
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
