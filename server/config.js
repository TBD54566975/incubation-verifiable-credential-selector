const processEnv = {};
Object.keys(process.env).forEach((k) => {
  processEnv[k.toUpperCase()] = process.env[k];
});

const config = {
  AutoSuggestEndpoint: 'https://sophtron-prod.com/autoSuggest',
  ApiServiceEndpoint: 'http://api.sophtron-prod.com/api',
  LogLevel: 'debug',
  Port: '8080',
  Env: 'dev', // mocked
  Version: '',
  Component: 'sph-widget-v2',
  CryptoKey: 'c42359fd32f1ce97c65d7636e82ec8646309df2b8d5e17282b80b23d213fa2c2',
  CryptoIv: '453687d854d55101f001b5999b68bc3d',
  CryptoAlgorithm: 'aes-256-cbc',
  ResourcePrefix: 'http://localhost:3000', // 'http://static.sophtron-prod.com/widget',
  ResourceVersion: '', // 'development'
  SophtronApiUserId: 'ba10bd5b-5387-47ff-a7f2-ae023b78a734',
  SophtronApiUserSecret: '',
  MxClientId: 'cb102a7c-14a2-4b4a-8241-076d5eedd115',
  MxDemoUserId: 'USR-753b539c-6281-4a71-b68b-347e68876035',
  MxDemoMemberId: 'MBR-32d68a9e-7b50-4826-b215-332bc36ca011',
  MxApiSecret: 'b6206560f0c7851aab39255c4fd889419685f866',
};
const arr = Object.keys(config);
for (let i = 0; i < arr.length; i++) {
  const key = arr[i];
  config[key] = processEnv[key.toUpperCase()] || config[key];
}
module.exports = config;
