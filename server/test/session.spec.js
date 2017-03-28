import { expect } from 'chai';
import config from 'config';
import session from 'api/session';
import nock from 'nock';

const mockedSessionKey = '756524c0c25a440e8f80bd108a715995_rrsqbjcb_06a13f0a788e803fcc56e78802891a26';

const nockFor = {
  session: {
    invalidConfig: () => {
      nock(`${config.apiUrl}`)
        .post('/apiservices/pricing/v1.0')
        .query(true)
        .reply(400, {
          ValidationErrors: [ { ParameterName: 'apikey', Message: 'ApiKey invalid' } ]
        });
    },
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
        .reply(200, {
          Status: 'UpdatesComplete',
          Itineraries: ['woo', 'waa']
        });
    }
  }
};

describe('Session', () => {
  context('getSessionKey()', () => {
    context('with invalid configuration', () => {
      beforeEach(() => {
        nockFor.session.invalidConfig();
      });
      it('should be rejected', () => {
        return session({
          apiKey: 'dummyKey',
          apiUrl: `${config.apiUrl}apiservices/pricing/v1.0`
        }, {})
          .getSessionKey()
          .catch(error => {
            expect(error).to.have.property('ValidationErrors');
          });
      });
    });

    context('with valid configuration and parameters', () => {
      beforeEach(() => {
        nockFor.session.validConfig();
      });

      it('should return a session key', done => {
        session({
          apiKey: config.apiKey,
          apiUrl: `${config.apiUrl}apiservices/pricing/v1.0`
        }, {})
          .getSessionKey()
          .then(sessionKey => {
            expect(sessionKey).to.be.equal(mockedSessionKey);
            done();
          });
      });
    });
  });

  context('getResults()', () => {
    beforeEach(() => {
      nockFor.session.validConfig();
      nockFor.session.validResults();
    });

    it('should return flight results object', done => {
      const mySession = session({
        apiKey: config.apiKey,
        apiUrl: `${config.apiUrl}apiservices/pricing/v1.0`
      }, {});

      mySession
        .getSessionKey()
        .then(sessionKey => {
          mySession.getResults(sessionKey).then(results => {
            expect(results).to.have.property('Itineraries');
            expect(results).to.have.property('Status');
            done();
          });
        });
    });
  });
});
