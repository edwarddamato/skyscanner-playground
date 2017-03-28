import { apiKey as defaultApiKey } from './loader';

const apiUrl = 'http://partners.api.skyscanner.net/';

const generateConfig = () => {
  // api key is still retrieved from ENV as it can be overridden
  const apiKey = process.env.APIKEY || defaultApiKey;

  if (!apiKey) {
    console.error('APIKEY must be defined in the root .config.js file or as an environment variable using `APIKEY=<key> yarn run server`.');
    process.exit(1);
  }

  return {
    apiKey,
    apiUrl
  };
};

export default generateConfig();
