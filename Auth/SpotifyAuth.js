const Axios = require('axios');

const getAccessToken = async (receivedCode) => {
  const url = 'https://accounts.spotify.com/api/token';
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    code: receivedCode,
    grant_type: 'authorization_code',
    redirect_uri: `${process.env.SITE_URL}/auth/spotify`,
  };
  const res = await Axios.default({
    url,
    method: 'post',
    params,
  });
  return res.data.access_token;
};

const getUserInfo = async (accessToken) => {
  const url = 'https://api.spotify.com/v1/me';
  const authHeader = { Authorization: `Bearer ${accessToken}` };
  const res = await Axios.default.get(url, { headers: authHeader });
  return res.data.display_name;
};

const spotifyController = async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const userData = await getUserInfo(accessToken);
    res.json({ userData });
  } catch (err) {
    res.sendStatus(201);
  }
};

module.exports = spotifyController;
