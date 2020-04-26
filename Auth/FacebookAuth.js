const Axios = require('axios');

const getAccessToken = async (code) => {
  const url = `${process.env.FACEBOOK_BASE_URL}/${process.env.FACEBOOK_API_VERSION}/oauth/access_token`;
  const params = {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: `${process.env.SITE_URL}/auth/facebook`,
    code,
  };
  const res = await Axios.default.get(url, { params });
  return res.data.access_token;
};

const getUserId = async (accessToken) => {
  const url = `${process.env.FACEBOOK_BASE_URL}/debug_token`;
  const params = {
    input_token: accessToken,
    access_token: accessToken,
  };
  const res = await Axios.default.get(url, { params });
  return res.data.data.user_id;
};

const getUserInfo = async (accessToken, userId) => {
  const url = `${process.env.FACEBOOK_BASE_URL}/${process.env.FACEBOOK_API_VERSION}/${userId}`;
  const params = { access_token: accessToken };
  const res = await Axios.default.get(url, { params });
  return res.data.name;
};

const facebookController = async (req, res) => {
  try {
    const { code } = req.body;
    const accessToken = await getAccessToken(code);
    const userId = await getUserId(accessToken);
    const userData = await getUserInfo(accessToken, userId);
    res.json({ userData });
  } catch (err) {
    res.sendStatus(201);
  }
};

module.exports = facebookController;
