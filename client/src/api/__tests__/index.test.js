jest.mock('/utils/fetchWrapper', () => {
  return {
    fetchWrapper: ({ url, request }) => {
      return new Promise(resolve => {
        resolve({
          ok: true,
          json: () => {
            return new Promise(resolve => {
              resolve({
                url,
                request
              });
            });
          }
        });
      });
    }
  };
});

import { getFlights } from '../index';
import config from '/config';

const withFreshGetFlightsRequest = (customSearchParams, assertion) => () => {
  const flightSearchParams = {
    originPlace: '',
    destinationPlace: '',
    outboundDate: new Date(),
    inboundDate: new Date(),
    cabinClass: '',
    adults: 0,
    children: 0,
    ...customSearchParams
  };
  return getFlights(flightSearchParams)
    .then(assertion);
};

describe('getFlights', () => {
  it('should use the config apiUrl', withFreshGetFlightsRequest({}, results => {
    expect(results.url).toEqual(config.apiUrl);
  }));

  it('should use \'POST\' as method with the appropriate headers', withFreshGetFlightsRequest({}, results => {
    expect(results.request.method).toEqual('POST');
    expect(results.request.headers).toEqual({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }));

  it('should send the search parameters as supplied', withFreshGetFlightsRequest({
    originPlace: 'MLA',
    destinationPlace: 'LHR',
    outboundDate: new Date('2017-11-01'),
    inboundDate: new Date('2017-11-02'),
    cabinClass: 'Economy',
    adults: 5,
    children: 10,
    infants: 15
  }, results => {
    expect(results.request.body).toEqual(JSON.stringify({
      originPlace: 'MLA',
      destinationPlace: 'LHR',
      outboundDate: '2017-11-01',
      inboundDate: '2017-11-02',
      cabinClass: 'Economy',
      adults: 5,
      children: 10,
      infants: 15
    }));
  }));

  it('should not send an inboundDate in the search parameters if not supplied', withFreshGetFlightsRequest({
    outboundDate: new Date('2017-06-06'),
    inboundDate: undefined
  }, results => {
    expect(results.request.body).toEqual(JSON.stringify({
      originPlace: '',
      destinationPlace: '',
      outboundDate: '2017-06-06',
      cabinClass: '',
      adults: 0,
      children: 0
    }));
  }));
});
