const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log } = require('./utils');

require('dotenv').config();

console.log(process.env.API_URL)

const githubAuth = require('./Auth/GithubAuth');
const facebookAuth = require('./Auth/FacebookAuth');
const spotifyAuth = require('./Auth/SpotifyAuth');

const PORT = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.post('/auth/github', githubAuth);
app.post('/auth/facebook', facebookAuth);
app.post('/auth/spotify', spotifyAuth);

app.listen(PORT, () => log(`Running at port ${PORT} ...`));
