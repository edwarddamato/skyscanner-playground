let apiKey;

try {
  const config = require('../../.config');

  apiKey = config.default.apiKey;
} catch (ex) {
  console.warn('No .config.js file found.');
}

export { apiKey };
