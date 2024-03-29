const { VcType } = require('../shared/contract.ts');

const http = require('./serviceClients/http');
const config = require('./config');
const logger = require('./infra/logger');
const service = require('./serviceClients/services.ts');

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error('Error making example did-vc', err);
    res.status(500);
    res.send('Unexpected error, please refresh the page and try agin');
  });
};
module.exports = async function (app) {
  app.get(
    '/example/did/vc/identity/:provider/:id/:userId?',
    asyncHandler(async (req, res) => {
      const { userId, id } = req.params;
      if (req.params.provider === 'sophtron') {
        if (id) {
          const data = await service.getVC(
            id,
            VcType.IDENTITY,
            userId
              ? {
                user_id: userId,
              }
              : null
          );
          res.setHeader('content-type', 'application/json');
          res.send(data);
        } else {
          res.status(404).send('invalid id');
        }
      } else {
        res.sendStatus(501);
      }
    })
  );
  app.get(
    '/example/did/vc/banking/:provider/:id/:userId?',
    asyncHandler(async (req, res) => {
      const { userId, id } = req.params;
      if (req.params.provider === 'sophtron') {
        if (id) {
          const data = await service.getVC(
            id,
            VcType.ACCOUNTS,
            userId
              ? {
                user_id: userId,
              }
              : null
          );
          res.setHeader('content-type', 'application/json');
          res.send(data);
        } else {
          res.status(404).send('invalid id');
        }
      } else {
        res.sendStatus(501);
      }
    })
  );
  app.get('/example/*', async (req, res) => {
    // console.log('loading default page');
    const resourcePath = `${config.ResourcePrefix}${
      config.ResourceVersion
    }/${req.path.replace('/example/', '').replace('did', 'loader')}.html`;
    logger.trace(`serving: ${resourcePath}`);
    await http
      .get(resourcePath)
      .then((r) => {
        res.setHeader('content-type', 'text/html');
        res.send(
          r.replace(
            '$did_demo',
            req.path.indexOf('did') > -1 ? 'true' : 'false'
          )
        );
      })
      .catch((err) => {
        res.sendStatus(500);
        logger.error(`Unable to load idnex resource from ${resourcePath}`, err);
      });
  });
};
