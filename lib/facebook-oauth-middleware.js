'use strict';

const request = require('superagent');
const debug = require('debug')('art-c:facebook-oauth-middleware');

module.exports = function(req, res, next){
  debug('getting facebook user info');

  let tokenData = {
    code: `code=${req.query.code}`,
    client_id: `client_id=${process.env.FACEBOOK_CLIENT_ID}`,
    client_secret: `client_secret=${process.env.FACEBOOK_CLIENT_SECRET}`,
    redirect_uri: `redirect_uri=${process.env.API_URL}/api/auth/facebook_oauth_callback`,
  };

  let accessToken, tokenTTL;

  request.get(`https://graph.facebook.com/v2.8/oauth/access_token?${tokenData.client_id}&${tokenData.redirect_uri}&${tokenData.client_secret}&${tokenData.code}`)
  .then( response => {
    accessToken = response.body.access_token;
    tokenTTL = response.body.expires_in;
    return request.get(`https://graph.facebook.com/v2.8/me?access_token=${accessToken}&fields=id,name,email`);
  })
  .then( response => {
    let parsed = JSON.parse(response.text);
    req.facebookOAUTH = {
      facebookID: parsed.id,
      email: parsed.email,
      tokenTTL,
      accessToken,
    };
    next();
  })
  .catch( (err) => {
    req.facebookError = err;
    next();
  });
};
