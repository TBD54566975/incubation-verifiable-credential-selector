const http = require('./serviceClients/http');
const config = require('./config');
const sophtronClient = require('./serviceClients/sophtronClient');
const logger = require('./infra/logger');

async function getIntegrationKey() {
  const ret = (await sophtronClient.getUserIntegrationKey()).IntegrationKey;
  return { IntegrationKey: ret };
}
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error('Error making example did-vc', err);
    res.status(500);
    res.send('Unexpected error, please refresh the page and try agin');
  });
};
async function clearConnection(vc, id) {
  if (config.Demo && vc.issuer) {
    // a valid vc should have an issuer field. this means we have a successful response,
    // once a VC is sccessfully returned to user, we clear the connection for data safty
    sophtronClient.deleteUserInstitution(id);
  }
}
module.exports = async function (app) {
  app.get(
    '/example/did/vc/identity/:provider/:id',
    asyncHandler(async (req, res) => {
      console.log(req.params);
      if (req.params.provider === 'sophtron') {
        if (req.params.id) {
          await http
            .post(
              `${config.DidDemoServiceEndpoint}vc/identity/${req.params.id}`,
              {
                masks: {
                  identity: ['name'],
                },
              },
              await getIntegrationKey()
            )
            .then((data) => {
              res.setHeader('content-type', 'application/json');
              res.send(data);
              clearConnection(data, req.params.id);
            });
        } else {
          res.status(404).send('invalid id');
        }
      } else {
        res.sendStatus(501);
      }
    })
  );
  app.get(
    '/example/did/vc/banking/:provider/:id',
    asyncHandler(async (req, res) => {
      if (req.params.provider === 'sophtron') {
        if (req.params.id) {
          await http
            .post(
              `${config.DidDemoServiceEndpoint}vc/accounts/${req.params.id}`,
              null,
              await getIntegrationKey()
            )
            .then((data) => {
              res.setHeader('content-type', 'application/json');
              res.send(data);
              clearConnection(data, req.params.id);
            });
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
