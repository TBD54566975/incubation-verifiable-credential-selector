const processEnv = {};
Object.keys(process.env).forEach((k) => {
  processEnv[k.toUpperCase()] = process.env[k];
});

const config = {
  AutoSuggestEndpoint: 'https://sophtron-prod.com/autoSuggest',
  ApiServiceEndpoint: 'http://api.sophtron-prod.com/api',
  LogLevel: 'debug',
  Port: '8080',
  Env: 'mocked', // mocked
  Version: '',
  Component: 'sph-widget-v2',
  CryptoKey: 'c42359fd32f1ce97c65d7636e82ec8646309df2b8d5e17282b80b23d213fa2c2',
  CryptoIv: '453687d854d55101f001b5999b68bc3d',
  CryptoAlgorithm: 'aes-256-cbc',
  ResourcePrefix: 'http://localhost:3000', // 'http://static.sophtron-prod.com/widget',
  ResourceVersion: '', // 'development'
  SophtronApiUserId: 'ba10bd5b-5387-47ff-a7f2-ae023b78a734',
  SophtronApiUserSecret: '',
  MxClientId: '861c3518-79df-4ed2-99cc-a21637694ea6',
  MxApiSecret: '',
};
const arr = Object.keys(config);
for (let i; i < arr.length; i++) {
  const key = arr[i];
  config[key] = processEnv[key.toUpperCase()] || config[key];
}
module.exports = config;
