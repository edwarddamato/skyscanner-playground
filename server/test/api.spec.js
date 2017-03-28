import { expect } from 'chai';
import config from 'config';
import { livePricing } from 'api';;
import nock from 'nock';
import { mockResults } from 'utils';

const mockedSessionKey = '756524c0c25a440e8f80bd108a715995_rrsqbjcb_06a13f0a788e803fcc56e78802891a26';

const nockFor = {
  session: {
    validConfig: () => {
      nock(`${config.apiUrl}`)
        .post('/apiservices/pricing/v1.0')
        .query(true)
        .reply(201, 'valid!', {
          location: `http://partners.api.skyscanner.net/apiservices/pricing/uk1/v1.0/${mockedSessionKey}`
        });
    },
    validResults: () => {
      nock(`${config.apiUrl}`)
        .get(`/apiservices/pricing/v1.0/${mockedSessionKey}`)
        .query(true)
        .reply(200, mockResults);
    }
  }
};

describe('Live Pricing', () => {
  context('getFlights()', () => {
    beforeEach(() => {
      nockFor.session.validConfig();
      nockFor.session.validResults();
    });

    it('should return flight results object', done => {
      livePricing.getFlights({})
        .then(results => {
          expect(results.Itineraries).to.be.ok;
          expect(results.Agents).to.be.ok;
          expect(results.Legs).to.be.ok;
          expect(results.Carriers).to.be.ok;
          expect(results.Places).to.be.ok;
          done();
        });
    });
  });
});
