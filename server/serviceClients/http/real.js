const crypto = require('crypto');
const axios = require('axios');
const logger = require('../../infra/logger');
const config = require('../../config');

function buildAuthCode(httpMethod, url) {
  const authPath = url.substring(url.lastIndexOf('/')).toLowerCase();
  const userId = config.SophtronApiUserId;
  const secret = Buffer.from(config.SophtronApiUserSecret, 'base64');
  const plainKey = `${httpMethod.toUpperCase()}\n${authPath}`;
  const b64Sig = crypto
    .createHmac('sha256', secret)
    .update(plainKey)
    .digest('base64');
  const authString = `FIApiAUTH:${userId}:${b64Sig}:${authPath}`;
  return authString;
}

function getHeaders(url, headers) {
  headers = headers || {};
  if (!headers.Authorization) {
    headers.Authorization = buildAuthCode('get', url);
  }
  return headers;
}

function stream(url, data, target) {
  logger.debug(`stream request: ${url}`);
  return axios({
    method: data ? 'post' : 'get',
    data,
    url,
    responseType: 'stream',
  })
    .then((res) => {
      logger.debug(`Received stream response from ${url}`);
      return res;
    })
    .catch((error) => {
      if (error.response) {
        logger.error(`error from ${url}`, error.response.status);
        return error.response;
      }
      logger.error(`error from ${url}`, error);

      return undefined;
    })
    .then((res) => {
      if (res && res.headers) {
        if (res.headers['content-type']) {
          target.setHeader('content-type', res.headers['content-type']);
        }
        return res.data.pipe(target);
      }
      target.status(500).send('unexpected error');

      return undefined;
    });
}

function wget(url) {
  logger.debug(`wget request: ${url}`);
  return axios
    .get(url)
    .then((res) => {
      logger.debug(`Received wget response from ${url}`);
      return res.data;
    })
    .catch((error) => {
      logger.error(`error from ${url}`, error);
      throw error;
    });
}

function get(url, headers, returnFullResObject) {
  const h = getHeaders(url, headers);
  logger.debug(`get request: ${url}`);
  return axios
    .get(url, { h })
    .then((res) => {
      logger.debug(`Received get response from ${url}`);
      return returnFullResObject ? res : res.data;
    })
    .catch((error) => {
      logger.error(`error from ${url}`, error);
      throw error;
    });
}

function post(url, data, headers, returnFullResObject) {
  logger.debug(`post request: ${url}`);
  return axios
    .post(url, data, { headers: getHeaders(url, headers) })
    .then((res) => {
      logger.debug(`Received post response from ${url}`);
      return returnFullResObject ? res : res.data;
    })
    .catch((error) => {
      logger.error(`error from ${url}`, error);
      throw error;
    });
}

module.exports = {
  get,
  wget,
  post,
  stream,
  buildAuthCode,
};
