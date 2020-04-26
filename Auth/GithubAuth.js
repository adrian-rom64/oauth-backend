const Axios = require('axios');

const getAccessToken = async (receivedCode) => {
  const url = 'https://github.com/login/oauth/access_token';
  const payload = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: receivedCode,
  };
  const res = await Axios.default.post(url, payload);
  const params = new URLSearchParams(res.data);
  return params.get('access_token');
};

const getUserInfo = async (accessToken) => {
  const url = 'https://api.github.com/user';
  const authHeader = { Authorization: `token ${accessToken}` };
  const res = await Axios.default.get(url, { headers: authHeader });
  return res.data.login;
};

const githubController = async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.body.code);
    const userData = await getUserInfo(accessToken);
    res.json({ userData });
  } catch (err) {
    res.sendStatus(201);
  }
};

module.exports = githubController;
