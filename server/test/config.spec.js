import { expect } from 'chai';

describe('Configuration', () => {
  context('with an APIKEY specified in ENV', () => {
    let config;
    before(() => {
      process.env.APIKEY = 'DUMMYAPIKEY';
      // this is to avoid require caching the config dependency and conflicting with other tests
      delete require.cache[require.resolve('config')];
      config = require('config').default;
    });

    it('should return valid configuration object', () => {
      expect(config.apiKey).to.be.equal('DUMMYAPIKEY');
      expect(config.apiUrl).to.be.equal('http://partners.api.skyscanner.net/');
    });
  });
});
